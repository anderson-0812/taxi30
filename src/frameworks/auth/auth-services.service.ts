import { HttpException, HttpStatus, Injectable } from "@nestjs/common";
import { JwtService } from "@nestjs/jwt";
import * as bcrypt from "bcrypt";
import * as CryptoJS from 'crypto-js';

import { errorClientResponse, errorSignInResponse } from "../../helpers/responses";
import { IAuthServices, IDataServices } from "../../core/abstracts";
import { Account, Person } from "../../core/entities";
import { RefreshTokenUseCases } from "../../use-cases/refresh-token";
import { RefreshTokenMobileDto } from "../../core/dtos";
import { jwtConstants } from "./constants";

@Injectable()
export class AuthServices implements IAuthServices {
    constructor(
        private dataServices: IDataServices,
        private refreshTokenUseCases: RefreshTokenUseCases,
        private jwtService: JwtService
    ) { }

    //Registrar usuario en el sistema 
    async signUp(person: Person, google: boolean = false): Promise<Person> {
        //Verificar que no se repita cédula
        if (!(await this.dataServices.people.uniqueField({ identification: [person.identification] })) && google == false) {
            throw new HttpException(errorClientResponse('El número de cédula ya se encuentra registrado', ""), HttpStatus.BAD_REQUEST);
        }

        //Verificar que no se repita el celular
        if (!(await this.dataServices.people.uniqueField({ cellphone: [person.cellphone] })) && google == false) {
            throw new HttpException(errorClientResponse('El número de celular ya se encuentra registrado', ""), HttpStatus.BAD_REQUEST);
        }

        //Verificar que no se repita el correo
        if (!(await this.dataServices.people.uniqueField({ email: [person.email] }))) {
            throw new HttpException(errorClientResponse('El correo electrónico ya se encuentra registrado', ""), HttpStatus.BAD_REQUEST);
        }

        //Verificar que no se repita el nombre de usuario
        if (!(await this.dataServices.accounts.uniqueField({ username: [person.account.username] }))) {
            throw new HttpException(errorClientResponse('El nombre de usuario ya se encuentra registrado', ""), HttpStatus.BAD_REQUEST);
        }

        //Crear Usuario
        const newPerson = await this.dataServices.people.create(person);
        return newPerson;
    }


    //Iniciar Sesión móvil
    async signIn(account: Account, callFromGoogle: boolean = false): Promise<any> {
        //Verificar que la cuenta existe
        if (await this.dataServices.people.uniqueField({ email: [account.username] }) &&
            await this.dataServices.people.uniqueField({ identification: [account.username] })
        ) {
            throw new HttpException(errorSignInResponse('El usuario no está registrado'), HttpStatus.OK);
        }

        //Verificar que la cuenta este activa
        if (callFromGoogle) {
            if (!(await this.verifyPersonActiveWebGoogle(account.username))) {
                throw new HttpException(errorClientResponse('El usuario está inactivo. Contáctese con el administrador', ""), HttpStatus.BAD_REQUEST);
            }
        } else if (!(await this.verifyPersonActiveMobile(account.username))) {
            throw new HttpException(errorSignInResponse('El usuario está inactivo. Contáctese con el administrador'), HttpStatus.OK);
        } else {
            if (!(await this.verifyPassword(account.username, account.password, false))) {
                throw new HttpException(errorSignInResponse('La contraseña es incorrecta'), HttpStatus.OK);
            }
        }

        //Obtener la persona, cuenta y refresh token
        const personServer = await this.dataServices.people.getOne(
            [{ identification: account.username }, { email: account.username }],
            'account,refreshTokens',
            { idPerson: 1, account: { idAccount: 1 }, refreshTokens: 1 }
        );

        //Generar objeto a enviar 
        const data = await this.generatePayload(account.username);
        const token = this.jwtService.sign(data, { expiresIn: jwtConstants.expirationMobile });

        // Verificar que exista el token
        if (personServer.refreshTokens.length > 0 && personServer.refreshTokens.some((x) => x.platform == 1)) {
            const refreshToken = personServer.refreshTokens.filter((x) => x.platform == 1);
            const refreshTokenDto: RefreshTokenMobileDto = { token: refreshToken[0].token, idPerson: data.idPerson }
            const result = await this.refreshToken(refreshTokenDto);
            return { token: result.token, person: result.data, refreshToken: { idRefreshToken: result.refreshToken.idRefreshToken } }
        } else {
            const refreshToken = await this.refreshTokenUseCases.createRefreshToken({ token: token, idPerson: data.idPerson, platform: 1 });
            return { token: token, person: data, refreshToken: { idRefreshToken: refreshToken.idRefreshToken } };
        }
    }

    //Función para refrescar token móvil
    async refreshToken(refreshTokenMobileDto: RefreshTokenMobileDto) {
        const refreshToken = await this.refreshTokenUseCases.getOneRefreshToken(refreshTokenMobileDto.token);
        if (!refreshToken) {
            const person = await this.dataServices.people.getOne({ idPerson: refreshTokenMobileDto.idPerson });
            const data = await this.generatePayload(person.email);
            const token = this.jwtService.sign(data, { expiresIn: jwtConstants.expirationMobile });
            const newRefreshToken = await this.refreshTokenUseCases.createRefreshToken({ token: token, idPerson: person.idPerson, platform: 1 });
            return { token: token, data: data, refreshToken: { idRefreshToken: newRefreshToken.idRefreshToken }, change: true };
        } else {
            const data = await this.generatePayload(refreshToken.person.email);

            if (this.refreshTokenUseCases.verifyExpiration(refreshToken)) {
                //eliminar el token de la base de datos
                await this.dataServices.refreshToken.delete(refreshToken.idRefreshToken);

                //Crear un nuevo registro de token
                const token = this.jwtService.sign(data, { expiresIn: jwtConstants.expirationMobile });
                const newRefreshToken = await this.refreshTokenUseCases.createRefreshToken({ token: token, idPerson: refreshToken.person.idPerson, platform: 1 });
                return { token: token, data: data, refreshToken: { idRefreshToken: newRefreshToken.idRefreshToken }, change: true };
            } else {
                return { token: refreshTokenMobileDto.token, data: data, refreshToken: { idRefreshToken: refreshToken.idRefreshToken }, change: false }
            }
        }
    }


    //Iniciar Sesión web
    async signInWeb(account: Account, callFromGoogle: boolean = false): Promise<any> {
        console.log('account desde signInWeb');
        console.log(account);
        //Verificar que la cuenta existe
        if ((await this.dataServices.accounts.uniqueField({ username: [account.username] }) &&
            await this.dataServices.people.uniqueField({ identification: [account.username] })) &&
            (await this.dataServices.people.uniqueField({ email: [account.username] }))
        ) {
            throw new HttpException(errorClientResponse('El usuario no está registrado', ""), HttpStatus.BAD_REQUEST);
        }

        //Verificar que la cuenta este activa
        if (callFromGoogle) {
            if (!(await this.verifyPersonActiveWebGoogle(account.username))) {
                throw new HttpException(errorClientResponse('El usuario está inactivo. Contáctese con el administrador', ""), HttpStatus.BAD_REQUEST);
            }
        } else if (!(await this.verifyPersonActiveWeb(account.username))) {
            throw new HttpException(errorClientResponse('El usuario está inactivo. Contáctese con el administrador', ""), HttpStatus.BAD_REQUEST);
        } else {
            if (!(await this.verifyPassword(account.username, account.password, true))) {
                throw new HttpException(errorClientResponse('La contraseña es incorrecta', ""), HttpStatus.BAD_REQUEST);
            }
        }

        //Obtener la persona, cuenta y refresh token
        const personServer = await this.dataServices.people.getOne([{ identification: account.username }, { email: account.username }], 'account,refreshTokens', { idPerson: 1, account: { idAccount: 1 }, refreshTokens: 1 });
        const accountServer = await this.dataServices.accounts.getOne({ username: account.username }, 'person,person.refreshTokens', { idAccount: 1, person: { idPerson: 1, refreshTokens: 1 } });

        //Actualizar el atributo recuerdame del servidor
        const remember = (account.rememberMe) ? true : false;
        const idAccount = (personServer) ? personServer.account.idAccount : accountServer.idAccount;
        await this.dataServices.accounts.update(idAccount, { rememberMe: remember });

        //Generar objeto a enviar 
        const data = await this.generatePayload(account.username);
        const token = this.jwtService.sign(data);

        //Verificar que exista el token
        const refresh = (personServer) ? personServer.refreshTokens : accountServer.person.refreshTokens;
        if (refresh.length > 0 && refresh.some(x => x.platform == 2)) {
            const refreshToken = refresh.filter((x) => x.platform == 2);
            return await this.refreshTokenWeb(refreshToken[0].token);
        } else {
            const refreshToken = await this.refreshTokenUseCases.createRefreshToken({ token: token, idPerson: data.idPerson, platform: 2 });
            return { token: token, data: data, refreshToken: { idRefreshToken: refreshToken.idRefreshToken } };
        }
    }

    async validateToken(token: string): Promise<any> {
        try {
            const refreshToken = await this.dataServices.refreshToken.getOne({ token: token });
            if (!refreshToken) {
                return false;
            }
            const validateToken = this.jwtService.verify(refreshToken.token);
            return (validateToken) ? true : false;
        } catch (error) {
            return false;
        }
    }

    //Función para refrescar el token
    async refreshTokenWeb(token: string) {
        const refreshToken = await this.refreshTokenUseCases.getOneRefreshToken(token);
        if (!refreshToken) {
            throw new HttpException(errorClientResponse('El token no existe. Iniciar sesión', { reload: true }), HttpStatus.OK);
        }

        const data = await this.generatePayload(refreshToken.person.email);
        await this.dataServices.refreshToken.delete(refreshToken.idRefreshToken);
        const newToken = this.jwtService.sign(data);
        const newRefreshToken = await this.refreshTokenUseCases.createRefreshToken({
            token: newToken,
            idPerson: refreshToken.person.idPerson,
            platform: 2
        });

        return { token: newToken, data: data, refreshToken: { idRefreshToken: newRefreshToken.idRefreshToken } };
    }

    //Verificar si la persona tiene una cuenta activa móvil
    private async verifyPersonActiveMobile(username: string) {
        const personServer = await this.dataServices.people.getOne([{ identification: username }, { email: username }]);
        if (personServer) {
            return (personServer.active) ? true : false;
        }
    }

    //Verificar si la persona tiene una cuenta activa web
    private async verifyPersonActiveWeb(username: string) {
        // solo deberia buscar o bien en account o en eprson ya que siempre se crearan ambos registros juntos 
        // esta consulta devuelve el opbj persona y obj cuenta
        const personServer = await this.dataServices.people.getOne({ identification: username });
        let result;
        if (personServer) {
            result = (personServer.active) ? true : false;
        } else {
            const accountServer = await this.dataServices.accounts.getOne({ username: username }, 'person');
            result = (accountServer.person.active) ? true : false;
        }
        return result;
    }


    //Verificar si la persona tiene una cuenta google activa web
    async verifyPersonActiveWebGoogle(email: string) {
        const personServer = await this.dataServices.people.getOne({ email: email });
        let result;
        if (personServer) {
            result = (personServer.active) ? true : false;

        } else {
            const accountServer = await this.dataServices.accounts.getOne({ username: email }, 'person');

            if (accountServer) {
                result = (accountServer.person.active) ? true : false;
            } else {
                result = false;
            }
        }
        return result;

    }

    //Verificar si la persona tiene una cuenta google activa web
    async getPersonWebGoogle(email: string) {
        const personServer = await this.dataServices.people.getOne({ email: email }, 'account');
        let result;
        if (personServer) {
            result = personServer;
        } else {
            const accountServer = await this.dataServices.accounts.getOne({ username: email }, 'person');
            result = accountServer;
        }
        return result;
    }


    //Comprobar que la contraseña sea correcta
    private async verifyPassword(username: string, password: string, isWeb: boolean) {
        console.log('password1 desde verifyPassword');
        console.log(password);
        // password = (isWeb) ? CryptoJS.AES.decrypt(password.toString(), 'moverU').toString(CryptoJS.enc.Utf8) : password;
        console.log('password2 desde verifyPassword');
        console.log(password);
        console.log('username');
        console.log(username);
        const [personServer, accountServer] = await Promise.all([
            this.dataServices.people.getOne([{ identification: username }, { email: username }], 'account'),
            this.dataServices.accounts.getOne({ username })
        ]);

        return await bcrypt.compare(password, (personServer) ? personServer.account.password : accountServer.password);
    }

    //Generar el objeto con datos a mandar en el login
    private async generatePayload(username: string) {
        const personInformation = await this.dataServices.people.getOne([{ identification: username }, { email: username }], 'account');
        if (personInformation) {
            return {
                idPerson: personInformation.idPerson,
                identification: personInformation.identification,
                fullname: personInformation.name + " " + personInformation.lastname,
                name: personInformation.name,
                lastname: personInformation.lastname,
                email: personInformation.email,
                idAccount: personInformation.account.idAccount,
                username: personInformation.account.username,
                active: personInformation.active,
                image: personInformation.image,
                refresh: personInformation.account.rememberMe,
                countryCode: personInformation.countryCode,
                role: personInformation.role,
                cellphone: personInformation.cellphone,
                isBicibus: personInformation.isBicibus,
                isCarpool: personInformation.isCarpool,
                isDisabled: personInformation.isDisabled,
                principal_street: personInformation?.principal_street,
                secondary_street: personInformation?.secondary_street,
                latitude: personInformation?.latitude,
                longitude: personInformation?.longitude,
                google: personInformation.account.google
            }
        } else {
            let accountInformation = await this.dataServices.accounts.getOne({ username: username }, 'person');
            return {
                idPerson: accountInformation.person.idPerson,
                identification: accountInformation.person.identification,
                fullname: accountInformation.person.name + " " + accountInformation.person.lastname,
                name: accountInformation.person.name,
                lastname: accountInformation.person.lastname,
                email: accountInformation.person.email,
                idAccount: accountInformation.idAccount,
                username: accountInformation.username,
                active: accountInformation.person.active,
                image: accountInformation.person.image,
                refresh: accountInformation.rememberMe,
                countryCode: accountInformation.person.countryCode,
                role: accountInformation.person.role,
                cellphone: accountInformation.person.cellphone,
                isBicibus: accountInformation.person.isBicibus,
                isCarpool: accountInformation.person.isCarpool,
                isDisabled: accountInformation.person.isDisabled,
                principal_street: accountInformation.person.principal_street,
                secondary_street: accountInformation.person.secondary_street,
                latitude: accountInformation.person.latitude,
                longitude: accountInformation.person.longitude,
                google: accountInformation.google
            }
        }
    }

} 