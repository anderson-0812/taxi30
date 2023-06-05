export interface IMySqlConfigAttributes {
    username?: string;
    password?: string;
    database?: string;
    host?: string;
    port?: number | string;
    type?: string;
    synchronize?: boolean;
    entities?: any[];
}


export interface IMySqlConfig {
    development: IMySqlConfigAttributes;
    test: IMySqlConfigAttributes;
    production: IMySqlConfigAttributes;
}
