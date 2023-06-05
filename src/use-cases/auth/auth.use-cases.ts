import { HttpException, HttpStatus, Injectable } from "@nestjs/common";
import { successResponse, errorClientResponse } from '../../helpers/responses';

import { IAuthServices, IDataServices } from "../../core/abstracts";
import { AccountDto, SignInMobileDto, SignUpDto, RefreshTokenMobileDto, SignInWebDto, RefreshTokenWebDto, LogoutDto, UpdatePersonDto, ValidateTokenDto } from "../../core/dtos";
import { AuthFactoryService } from "./auth-factory.service";
import { googleVerify } from "../../helpers/google-verify";

@Injectable()
export class AuthUseCases {
    constructor(
        private authServices: IAuthServices,
        private dataServices: IDataServices,
        private authFactory: AuthFactoryService,
    ) { }

    //Registrar Usuario
    async signup(signUpDto: SignUpDto, google?: boolean) {
        const person = await this.authFactory.signUp(signUpDto);
        const newPerson = await this.authServices.signUp(person, google);
        return successResponse("Usuario registrado correctamente", newPerson);
    }

    //Iniciar sesión en móvil
    async singin(singInMobileDto: SignInMobileDto, callFromGoogle: boolean = false) {
        const account = this.authFactory.signIn(singInMobileDto);
        const result = await this.authServices.signIn(account, callFromGoogle);
        return successResponse("Inicio de Sesión Correcto", result);
    }

    // Validar token de usuario
    async validateToken(validateTokenDto: ValidateTokenDto) {
        const response = await this.authServices.validateToken(validateTokenDto.token);
        return successResponse("La validación del token fue exitosa", response);
    }

    //Refrescar token móvil
    async refreshToken(refreshTokenMobileDto: RefreshTokenMobileDto) {
        const result = await this.authServices.refreshToken(refreshTokenMobileDto);
        return successResponse('Token actualizado con éxito', result);
    }

    //Inicar sesión en app
    async signinWeb(signInWebDto: SignInWebDto, callFromGoogle: boolean = false) {
        const account = this.authFactory.signIn(signInWebDto);
        const result = await this.authServices.signInWeb(account, callFromGoogle);
        return successResponse("Inicio de Sesión Correcto", result);
    }

    //Refrescar token web
    async refreshTokenWeb(refreshTokenWebDto: RefreshTokenWebDto) {
        const result = await this.authServices.refreshTokenWeb(refreshTokenWebDto.token);
        return successResponse('Token actualizado con éxito', result);
    }

    //Inicar sesión con google
    async singInGoogle(token: string, google: boolean, callFromWeb: boolean) {
        try {
            // Verificar el usuario de Google
            const googleUserData = await googleVerify(token).catch(console.error);
            if (!googleUserData) {
                throw new HttpException(errorClientResponse('Inicio de Sesión con google Fallo', ""), HttpStatus.BAD_REQUEST);
            }
            const { email, picture, given_name, family_name } = googleUserData;

            //Verificar si la cuenta está activa
            let dataPerson = await this.authServices.getPersonWebGoogle(email);
            if (dataPerson) {
                let dataPersonActive = await this.authServices.verifyPersonActiveWebGoogle(email);
                if (!dataPersonActive) {
                    throw new HttpException(errorClientResponse('Usuario deshabilitado, comuniquese con administración', ""), HttpStatus.BAD_REQUEST);
                }
            }

            //Verificar si el correo es válido
            const emailIsValid = await this.validateDomainEmail(email);
            if (!emailIsValid) {
                throw new HttpException(errorClientResponse('Inicio de Sesión con google Fallo, correo no pertenece al dominio de la empresa', ""), HttpStatus.BAD_REQUEST);
            }

            // En caso de que la persona no exista se registra e inicia sesión
            if (!dataPerson) {
                let createUserDto: SignUpDto = {
                    identification: null,
                    name: given_name,
                    lastname: family_name,
                    birthday: new Date(),
                    countryCode: '',
                    cellphone: '',
                    email: email,
                    latitude: 0,
                    longitude: 0,
                    principal_street: '',
                    secondary_street: '',
                    isDisabled: false,
                    isBicibus: false,
                    isCarpool: false,
                    gender: '',
                    image: picture,
                    account: {
                        username: email,
                        password: process.env.PASSWORD_DEFAULT_GOOGLE
                    },
                    role: 1,
                };

                // create a new person
                const signUpRes = await this.signup(createUserDto, google);
                dataPerson = signUpRes.data;

            } else {
                dataPerson.account.google = google;
                await this.updatePerson(dataPerson.idPerson, dataPerson);
            }

            // this process is equal to a normal login 
            const result = await this.normalLogin(dataPerson, google, callFromWeb);
            return successResponse("Inicio de Sesión con google Correcto", result);

        } catch (error) {
            throw new HttpException(errorClientResponse(error, ""), HttpStatus.BAD_REQUEST);
        }
    }

    // Normal Login
    async normalLogin(dataPerson: any, google: boolean, callFromWeb) {
        let accountDto: AccountDto = {
            username: dataPerson.email,
            password: process.env.PASSWORD_DEFAULT_GOOGLE,
            rememberMe: false,
            google: google
        };
        const account = this.authFactory.signIn(accountDto);
        const result = (callFromWeb) ? await this.authServices.signInWeb(account, true) : await this.authServices.signIn(account, true);

        return result;
    }

    async validateDomainEmail(email: string) {
        const isValid = (email.split('@')[1] === process.env.EMAIL_DOMAIN) ? true : false;
        return isValid;
    }

    //Cerrar Sesión
    async logout(logoutDto: LogoutDto) {
        await this.dataServices.refreshToken.delete(logoutDto.idRefreshToken);
        return successResponse("Cerrado de Sesión realizado correctamente", null);
    }

    //Actualizar persona y cuenta
    async updatePerson(idPerson: number, updatePersonDto: UpdatePersonDto) {
        const obj = this.authFactory.updatePerson(updatePersonDto);
        const person = await this.dataServices.people.getOne({ idPerson }, 'account');
        await this.dataServices.accounts.update(person.account.idAccount, obj.account);
        await this.dataServices.people.update(idPerson, obj.person);
        return successResponse("Persona actualizada satisfactoriamente", "");
    }
}