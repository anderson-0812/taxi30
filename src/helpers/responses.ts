import { GenericResponse } from "../core/entities";
import {
    ERROR_CODE_BAD_REQUEST,
    ERROR_CODE_NOT_REGISTER,
    ERROR_CODE_NOT_USER_ACTIVE,
    ERROR_CODE_OK,
    ERROR_CODE_SERVICES,
    ERROR_CODE_SIGN_IN,
    INTERNAL_CODE_BAD_REQUEST, INTERNAL_CODE_EMPTY_LIST,
    INTERNAL_CODE_NOT_REGISTER,
    INTERNAL_CODE_NOT_USER_ACTIVE,
    INTERNAL_CODE_OK
} from "./codeResponse";

// Respuesta Existosa
export function successResponse(message: string, data: any) {
    return new GenericResponse(INTERNAL_CODE_OK, "", ERROR_CODE_OK, message, data);
}

// Respuesta empty list
export function successResponseEmpty(message: string) {
    return new GenericResponse(INTERNAL_CODE_EMPTY_LIST, "Lista vacía", ERROR_CODE_OK, message, null);
}

// Respuesta Error por falta de datos
export function errorClientResponse(message: string, data: any) {
    return new GenericResponse(INTERNAL_CODE_BAD_REQUEST, "Petición Errónea", ERROR_CODE_BAD_REQUEST, message, data);
}

// Respuesta Error Inicio de Sesión
export function errorSignInResponse(message: string) {
    return new GenericResponse(INTERNAL_CODE_BAD_REQUEST, message, ERROR_CODE_SIGN_IN, message, "");
}

// Respuesta Error Usuario está inactivo en el sistema
export function errorUserNotActive() {
    return new GenericResponse(INTERNAL_CODE_NOT_USER_ACTIVE, "Usuario deshabilitado", ERROR_CODE_NOT_USER_ACTIVE, "El usuario está inactivo en el sistema", null);
}

// Respuesta Error El registro consultado no se encuentra en la BBDD
export function errorNotRegisterFound(message: string) {
    return new GenericResponse(INTERNAL_CODE_NOT_REGISTER, "Registro no encontrado", ERROR_CODE_NOT_REGISTER, message, null);
}

// Respuesta Error al consultar recursos externos
export function errorExternalEndPoints(message: string) {
    return new GenericResponse(INTERNAL_CODE_BAD_REQUEST, message, ERROR_CODE_SERVICES, message, null);
}

// Configura una respusta genrica de acuerdo a lo que se necesite, sea cor recta o incorrecta
export function responseDetail(internalCode: number, error: string, errorCode: any, message: string, data: any) {
    if (!internalCode)
        internalCode = INTERNAL_CODE_OK;
    if (!error)
        error = "";
    if (!errorCode)
        errorCode = ERROR_CODE_OK;
    if (!data)
        data = [];
    if (!message)
        message = "Petición realizada con éxito.";
    return new GenericResponse(internalCode, error, errorCode, message, data);
}