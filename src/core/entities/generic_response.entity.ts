export class GenericResponse {
    internalCode: number;
    error: string;
    errorCode: any;
    message: string;
    data: any;

    constructor(
        internalCode: number,
        error: string,
        errorCode: any,
        message: string,
        data: any
    ) {
        this.internalCode = internalCode;
        this.error = error;
        this.errorCode = errorCode;
        this.message = message;
        this.data = data;
    }
}