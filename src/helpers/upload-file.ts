import { HttpException, HttpStatus } from "@nestjs/common";
import * as multer from "multer";
import { v4 as uuidv4 } from "uuid";

//Filtro para la extensión de imagen permitido
export const imageFileFilter = (req, file, callback) => {
    if (!file.originalname.match(/\.(jpg|jpeg|png|svg|JPG)$/)) {
        return callback(new HttpException('Solo se permiten imágenes', HttpStatus.BAD_REQUEST), false);
    }
    callback(null, true);
};

//Almacenar imagen en un directorio específico
export const storage = (destination: string) => {
    return multer.diskStorage({
        destination: destination,
        filename: (req, file, callback) => {
            let fileName = file.originalname.split('.');
            let fileExtension = fileName[fileName.length - 1];
            callback(null, uuidv4() + "." + fileExtension);
        }
    });
}

//Filtrar extensión de Excel
export const excelFileFilter = (req, file, callback) => {
    if (!file.originalname.match(/\.(xlsx)$/)) {
        return callback(new HttpException('Solo se permiten archivos Excel', HttpStatus.BAD_REQUEST), false);
    }
    callback(null, true);
};

