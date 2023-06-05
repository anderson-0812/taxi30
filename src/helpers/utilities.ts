import * as moment from 'moment-timezone';

export const formatDate = (date: string) => {
    return moment(date).tz('America/Guayaquil').format('').replace(/T/, ' ').replace(/\..+/, '').substring(0, 19);
}

export const validDateTravel = (date: string) => {
    // const curren
    const minDate = getStringDate(new Date().toLocaleString('es-EC', { timeZone: 'America/Guayaquil' }));
    const dateTravel = getStringDate(date);
    const maxDate = getStringDate(new Date(new Date().getTime() + 7 * 24 * 60 * 60 * 1000).toLocaleDateString('es-EC', { timeZone: 'America/Guayaquil' }));

    return dateTravel.year >= minDate.year && dateTravel.year <= maxDate.year
        && dateTravel.month >= minDate.month && dateTravel.month <= maxDate.month
        && (
            (
                dateTravel.day == minDate.day &&
                ((dateTravel.hours == minDate.hours && dateTravel.minutes >= minDate.minutes) || (dateTravel.hours > minDate.hours))
            )
            || dateTravel.day > minDate.day && dateTravel.day <= maxDate.day
            || dateTravel.month == maxDate.month && dateTravel.day <= maxDate.day
            || dateTravel.month == minDate.month && dateTravel.day >= minDate.day
        );
}

const getStringDate = (date: string) => {
    const dateBase = date.split(' ');
    const dateUse = dateBase[0].split('/');
    const timeUse = (dateBase[1] == undefined) ? ('00:00:00').split(':') : dateBase[1].split(':');

    return {
        year: parseInt(dateUse[2]),
        month: parseInt(dateUse[1]),
        day: parseInt(dateUse[0]),
        hours: parseInt(timeUse[0]),
        minutes: parseInt(timeUse[1]),
        seconds: parseInt(timeUse[2])
    }
}

export function formatPolygon(polygon: string) {
    let newPolygon = null;
    if (polygon) {
        newPolygon = (polygon.replace(/,/g, ' ')).replace(/;/g, ',')
    }
    return newPolygon
}

export function formatCoordinatesPolygon(polygon: string) {
    const dataCoordinatesPolygon = polygon.replace("POLYGON", "").replace(/,/g, ";").replace(/ /g, ",").replace(/[{()}]/g, "");
    return dataCoordinatesPolygon;
}

export function getDifferenceTime(startDate: Date) {
    const actualTime = new Date() as any;
    const startTime = startDate as any;

    let seconds = Math.floor((actualTime - (startTime)) / 1000);
    let minutes = Math.floor(seconds / 60);
    let hours = Math.floor(minutes / 60);
    let days = Math.floor(hours / 24);

    hours = hours - (days * 24);
    minutes = minutes - (days * 24 * 60) - (hours * 60);
    seconds = seconds - (days * 24 * 60 * 60) - (hours * 60 * 60) - (minutes * 60);

    return { hours, minutes, seconds };
}

export function getTime(startDate: Date) {
    const time = startDate.toString().split(':');
    const hours = parseInt(time[0]);
    const minutes = parseInt(time[1]);
    const seconds = parseInt(time[2]);
    return { hours, minutes, seconds };
}

//Determinar si un año es bisiesto
export function isLeapYear(year: number) {
    return (year % 400 === 0) ? true :
        (year % 100 === 0) ? false :
            year % 4 === 0;
}

//Decodificar polilínea
export const decodePolyline = (polyline: any) => {
    let currentPosition = 0, currentLat = 0, currentLng = 0;
    const dataLength = polyline.length;
    let polylineLatLngs = new Array();

    while (currentPosition < dataLength) {
        let shift = 0, result = 0;
        var byte;
        do {
            byte = polyline.charCodeAt(currentPosition++) - 63;
            result |= (byte & 0x1f) << shift;
            shift += 5;
        } while (byte >= 0x20);

        let deltaLat = ((result & 1) ? ~(result >> 1) : (result >> 1));
        currentLat += deltaLat;

        shift = 0;
        result = 0;

        do {
            byte = polyline.charCodeAt(currentPosition++) - 63;
            result |= (byte & 0x1f) << shift;
            shift += 5;
        } while (byte >= 0x20);

        let deltLng = ((result & 1) ? ~(result >> 1) : (result >> 1));
        currentLng += deltLng;
        polylineLatLngs.push({ latitude: currentLat * 0.00001, longitude: currentLng * 0.00001 });
    }
    return polylineLatLngs;
}

// Formatear modo en planificación de ruta
export const formatMode = (mode: string, isBICYCLEPublic: any) => {
    let response = mode;
    switch (mode) {
        case 'STOPS':
            response = 'Parada';
            break;
        case 'BICYCLE':
            response = (isBICYCLEPublic) ? 'BICYCLE_RENT' : mode;
            break;
        default:
            break;
    }
    return response;
}

// devolver si el parqueadero está abierto al momento de realizar la consulta
export const getParkingIsOpen = (normalSchedule: String, weekendSchedule: String) => {
    const today = moment().format("dddd");
    const posDayNow = formatDayNormalAndWeekend(today);
    const timeNow = moment().format("HH:mm");

    // Horario Normal
    if (normalSchedule) {
        const splitNormalSchedule = normalSchedule.split(";");
        const daySplitNormalSchedule = splitNormalSchedule[0].split("-");
        let timeSplitNormalSchedule = splitNormalSchedule[1].split("-");

        const daySinceNormal = daySplitNormalSchedule[0].trim().toLowerCase();
        const posDaySinceNormal = formatDayNormalAndWeekend(daySinceNormal);
        const dayUntilNormal = daySplitNormalSchedule[1].trim().toLowerCase();
        const posDayUntilNormal = formatDayNormalAndWeekend(dayUntilNormal);

        const timeSinceNormal = timeSplitNormalSchedule[0].trim();
        if (posDayNow < 6) {
            if (posDayNow >= posDaySinceNormal && posDayNow <= posDayUntilNormal) {
                if (posDayNow == posDaySinceNormal || posDayNow == posDayUntilNormal) {
                    return (timeSinceNormal <= timeNow) ? false : true;
                } else {
                    return true;
                }
            } else {
                return false;
            }
        }
    }

    // Horario Fin de Semana
    if (weekendSchedule) {
        let splitWeekendSchedule = "";
        let daySplitWeekendSchedule = [];
        let timeSplitWeekendSchedule = [];
        let daySinceWeekend = "";
        let posDaySinceWeekend;
        let dayUntilWeekend = "";
        let posDayUntilWeekend;
        let timeSinceWeekend = "";

        if (weekendSchedule !== "-") {
            splitWeekendSchedule = weekendSchedule.split(";") as any;
            daySplitWeekendSchedule = splitWeekendSchedule[0].split("-");
            timeSplitWeekendSchedule = splitWeekendSchedule[1].split("-");
            daySinceWeekend = daySplitWeekendSchedule[0].trim().toLowerCase();
            posDaySinceWeekend = formatDayNormalAndWeekend(daySinceWeekend);
            dayUntilWeekend = daySplitWeekendSchedule[1].trim().toLowerCase();
            posDayUntilWeekend = formatDayNormalAndWeekend(dayUntilWeekend);
            timeSinceWeekend = timeSplitWeekendSchedule[0].trim();
        }

        if (posDayNow > 5) {
            if (posDayNow >= posDaySinceWeekend && posDayNow <= posDayUntilWeekend) {
                if (posDayNow == posDaySinceWeekend || posDayNow == posDayUntilWeekend) {
                    return (timeSinceWeekend <= timeNow) ? false : true;
                } else {
                    return true;
                }
            } else {
                return false;
            }
        }
    }

    return true;
}



export function formatDayNormalAndWeekend(day) {
    switch (day) {
        case "lunes":
            return 1;
        case "martes":
            return 2;
        case "miércoles":
            return 3;
        case "jueves":
            return 4;
        case "viernes":
            return 5;
        case "sábado":
            return 6;
        case "domingo":
            return 7;
    }
}


//Formatear rol de persona
export const formatRole = (role: string) => {
    switch (role) {
        case 'Estudiante':
            return 1;
        case 'Docente':
            return 2;
        case 'Administrativo':
            return 3;
        case 'Chofer':
            return 4;
    }
}

//Formatear tipo de vehículo
export const formatTypeVehicle = (type: string) => {
    switch (type) {
        case 'Automóvil':
            return 1;
        case 'Camioneta':
            return 2;
        case 'Camión':
            return 3;
    }
}

export const formatFuelTypeVehicle = (fuelType: string) => {
    switch (fuelType) {
        case 'Gasolina':
            return 1;
        case 'Diesel':
            return 2;
        case 'Eléctrico': 
            return 3;
        case 'Híbrido':
            return 4;
    }
}
//Formatear fecha
export const formatDatePerson = (date: string) => {
    const data = date.split('/');
    return new Date(`${data[1]}/${data[0]}/${data[2]}`)
}

//formatear rol de persona
export const formatRolePerson = (role: string) => {
    const roles = ['estudiante', 'docente', 'administrativo', 'chofer'];
    let index = 0;
    roles.map((r, i) => {
        if (r.indexOf(role.toLowerCase()) > -1) {
            index = i + 1;
        }
    });
    return index;
}

// Verificar si dos fechas son iguales
export const datesAreEquals = (first: Date, second: Date) => {
    return first.getFullYear() === second.getFullYear() &&
        first.getMonth() === second.getMonth() &&
        first.getDate() === second.getDate();
}

// Verificar que el token siga activo
export const verifyExpiration = (time: string) => {
    return parseInt(time) < new Date().getTime();
}
//Distancia entre dos puntos en km con lat y log
export const getDistanceFromLatLonInKm = (lat1: number, lon1: number, lat2: number, lon2: number) => {
    const earthRadiusKm = 6371;
    const dLat = deg2rad(lat2 - lat1);
    const dLon = deg2rad(lon2 - lon1);

    const a =
        Math.sin(dLat / 2) * Math.sin(dLat / 2) +
        Math.cos(deg2rad(lat1)) * Math.cos(deg2rad(lat2)) *
        Math.sin(dLon / 2) * Math.sin(dLon / 2);

    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
    const distanceKm = earthRadiusKm * c;

    return distanceKm;
}

const deg2rad = (deg) => {
    return deg * (Math.PI / 180);
}

// presentar en horas y minutos 
export const formatToHoursMinutes = (hours: number) => {
    const hours_abs = Math.floor(hours);
    const minutes = (hours - hours_abs) * 60;
    return { hours: hours_abs, minutes: Math.floor(minutes) };
}


//Sumar tiempo a fecha
export const sumHoursToDate = (time: string, date: Date) => {
    // Sumar fechas con moment
    const durationMoment = moment.duration(time);
    const startMoment = moment(date);
    const endMoment = startMoment.add(durationMoment);

    //Formatear fecha y hora
    const dateRes = endMoment.format('YYYY-MM-DD');
    const timeResult = endMoment.format('HH:mm');

    //Ajustar fecha 
    if (endMoment.isBefore(startMoment)) {
        endMoment.add(1, 'day');
    }

    const dateResult = endMoment.toDate();

    return { date: dateRes, time: timeResult, dateFormat: dateResult }
}