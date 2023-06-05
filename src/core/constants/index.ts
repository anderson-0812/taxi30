export function isStringMessage(field: string) { return `El campo ${field} debe ser un texto` };
export function isDateMessage(field: string) {return `El campo ${field} debe ser una fecha válida`};
export function isBooleanMessage(field: string) {return `El campo ${field} debe ser un valor boleano` } ;
export function isRequiredMessage(field: string) {return `El campo ${field} es requerido`};
export function isNumberMessage(field: string) {return `El campo ${field} debe ser numérico`};
export const isEmailMessage: string = "El valor ingresado debe ser un correo válido";

export enum ReasonAlertEnum {
    intento_robo = 'Intento de robo',
    acoso = 'Acoso',
    sin_razon = 'sin_razon'
}

//-------------------------------Servicios externos--------------------------
export function getAddressPlace(place_id: number) {
    return `https://nominatim.openstreetmap.org/details.php?place_id=${place_id}&addressdetails=1&hierarchy=0&group_hierarchy=1&polygon_geojson=1&format=json`;
}

