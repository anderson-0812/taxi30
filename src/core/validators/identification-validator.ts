import { Injectable } from "@nestjs/common";
import { ValidatorConstraint, ValidatorConstraintInterface } from "class-validator";
import { ValidatorIdentification } from "../../helpers/validator-identification";

@ValidatorConstraint({ name: 'IdentificatorValidator', async: true })
@Injectable()
export class IdentificationValidator extends ValidatorIdentification implements ValidatorConstraintInterface {

    validate(value: any): boolean | Promise<boolean> {
        return ValidatorIdentification.esCedulaValida(value) || ValidatorIdentification.esRucValido(value);
    }

    defaultMessage(): string {
        return "La cédula ingresada no es válida";
    }
}