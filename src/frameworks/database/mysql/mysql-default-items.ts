export const defaultMethodPayment = { idMethodPayment: 1, name: 'Efectivo' };

export const defaultMethodEntries = [
    { idMethodEntry: 1, name: 'Scanner' },
    { idMethodEntry: 2, name: 'Ingreso por App' },
    { idMethodEntry: 3, name: 'Tag' }
];

export const defaultPlatforms = [
    { idPlatform: 1, name: 'IOS' },
    { idPlatform: 2, name: 'Huawei' },
    { idPlatform: 3, name: 'Android' },
    { idPlatform: 4, name: 'Web' }
]

export const defaultServices = [
    { idService: 1, name: 'Ruteador multimodal', type: 1 },
    { idService: 2, name: 'Parqueo', type: 2 },
    { idService: 3, name: 'Bicibus', type: 3 },
    { idService: 4, name: 'Auto compartido', type: 4 },
    { idService: 5, name: 'Ecovan', type: 5 }
];

export const defaultProfiles = [
    {
        idProfile: 1, name: "Administrador", description: "Acceso total al sistema",
        modules: [
            { idModule: 1 }, { idModule: 2 }, { idModule: 3 }, { idModule: 4 }, { idModule: 5 }, { idModule: 6 }, { idModule: 7 },
            { idModule: 8 }, { idModule: 9 }, { idModule: 10 }, { idModule: 11 }, { idModule: 12 }, { idModule: 13 }, { idModule: 14 },
            { idModule: 16 }, { idModule: 17 }, { idModule: 18 }
        ]
    },
    { idProfile: 2, name: "Invitado", description: "Perfil para invitados" },
    { idProfile: 3, name: "Estudiante" },
    { idProfile: 4, name: "Docente" },
    { idProfile: 5, name: "Administrativo" },
];

export const defaultGroupModules = [
    { idGroupModule: 1, name: 'Inicio', route: '/home', icon: 'home', order: 1 },
    {
        idGroupModule: 2, name: 'Administración', icon: 'person', order: 2,
        modules: [
            { idModule: 1, name: "Usuarios", description: "Administración de usuarios y accesos del sistema", route: '/users', order: 1 }
        ]
    },
    {
        idGroupModule: 3, name: 'Gestión', icon: 'grid_view', order: 3,
        modules: [
            { idModule: 2, name: "Campus", description: "Administración de los campus universitarios", route: '/campus', order: 1 },
            { idModule: 3, name: "Tipo de Accesos", description: "Administración de los tipos accesos de los campus", route: '/gate-types', order: 2 },
            { idModule: 4, name: "Accesos", description: "Administración de los accesos de entrada/salida de los campus", route: '/gates', order: 3 },
            { idModule: 5, name: "Parqueaderos", description: "Administración de parqueaderos", route: '/parkings', order: 4 },
            { idModule: 6, name: "Plazas", description: "Administración de plazas", route: '/squares', order: 5 },
            { idModule: 7, name: "Vehículos", description: "Administración de los vehículos del usuario", route: '/vehicles', order: 6 },
            { idModule: 8, name: "Viajes", description: "Administración de los viajes", route: '/travels', order: 7 },
        ]
    },
    {
        idGroupModule: 4, name: "Comunicación", icon: 'campaign', order: 4,
        modules: [
            { idModule: 9, name: "Tipos de notificación", description: "Administración de los tipos de notificación del sistema", route: '/notification-types', order: 1 },
            { idModule: 10, name: "Notificaciones", description: "Administración de las notificaciones del sistema", route: '/notifications', order: 2 },
            { idModule: 11, name: "Banners", description: "Administración de las banners del sistema", route: '/banners', order: 3 },
        ]
    },
    {
        idGroupModule: 5, name: "Reportes", icon: 'list_alt', order: 5,
        modules: [
            { idModule: 12, name: "Pánico", description: "Reportes del uso de botón de pánico", route: '/report-panic-button', order: 1 },
            { idModule: 13, name: "Viaje", description: "Reportes de los viajes realizados en la aplicación", route: '/individualized', order: 2 },
            { idModule: 14, name: "Parqueadero", description: "Reportes sobre el uso de parqueaderos", route: '/report-parking', order: 3 },
        ]
    },
    {
        idGroupModule: 6, name: "Técnico", icon: 'home_repair_service', order: 6,
        modules: [
            { idModule: 15, name: "Tipos de equipo", description: "Administración de los tipos de equipo usados en los parqueaderos", route: '/equipment-types', order: 1, active: false },
            { idModule: 16, name: "Equipos", description: "Administración de los equipos usados en los parqueaderos", route: '/equipments', order: 2 },
            { idModule: 17, name: "Comandos", description: "Administracion de los comandos usados en los equipos", route: '/commands', order: 3 }
        ]
    },
    {
        idGroupModule: 7, name: "Monitoreo", icon: 'location_on', order: 7,
        modules: [
            { idModule: 18, name: "Botón de pánico", description: "Alertas de pánico", route: '/panic-button', order: 1 }
        ]
    }
];

export const defaultTravelTypes = [
    { idTravelType: 1, name: 'Yo te llevo', order: 1, icon: 'img_carpool' },
    { idTravelType: 2, name: 'Bicibus', order: 2, icon: 'img_bicibus' },
    { idTravelType: 3, name: 'Grupos', order: 3, icon: 'img_grupos' },
    { idTravelType: 4, name: 'Ecovan', order: 4, icon: 'img_ecovan' },
    { idTravelType: 5, name: 'Ruteador multimodal', order: 5, icon: 'img_ruteador' },
];

export const defaultEquipmentTypes = [
    { idEquipmentType: 1, name: 'Lector de código de barra', description: 'Lectores de código de barras' },
    { idEquipmentType: 2, name: 'Antena', description: 'Antena de largo alcance' },
    { idEquipmentType: 3, name: 'Letrero', description: 'Letrero' }
];

export const defaultGateTypes = [
    { idGateType: 1, name: 'Vehicular' },
    { idGateType: 2, name: 'Peatonal' },
];