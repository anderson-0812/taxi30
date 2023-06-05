import * as dotenv from 'dotenv';
dotenv.config();

export const jwtConstants = {
    secret: process.env.JWTKEY,
    expirationWeb: process.env.TOKEN_EXPIRATION_WEB,
    expirationMobile: process.env.TOKEN_EXPIRATION_MOBILE
};