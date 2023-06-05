import { HttpException, HttpStatus, Injectable } from "@nestjs/common";
import * as bcrypt from "bcrypt";

import { errorClientResponse, successResponse } from "../../helpers/responses";
import { IDataServices } from "../../core/abstracts";
import { SetProfilesDto, UpdatePasswordDto } from "../../core/dtos";
import { AccountFactoryService } from "./account-factory.service";

@Injectable()
export class AccountUseCases {
    constructor(
        private dataServices: IDataServices,
        private accountFactoryService: AccountFactoryService
    ) { }

    //Obtener información de una cuenta y sus perfiles por id
    async getAccount(idAccount: number) {
        const account = await this.dataServices.accounts.getOne({ idAccount }, 'profiles', {
            idAccount: true,
            profiles: true,
        });
        return successResponse('Cuenta obtenida correctamente', account);
    }

    //Asignar perfiles en cuenta
    async setProfilesInAccount(accountDto: SetProfilesDto) {
        const account = this.accountFactoryService.setProfiles(accountDto);
        const newAccount = this.dataServices.accounts.create(account);
        return successResponse("Perfiles asignados a la cuenta de manera correcta", newAccount);
    }

    //Actualizar Contraseña
    async updatePassword(idAccount: number, updatePasswordDto: UpdatePasswordDto) {
        const account = await this.dataServices.accounts.getOne({ idAccount });
        if (await bcrypt.compare(updatePasswordDto.oldPassword, account.password)) {
            const updateAccount = await this.accountFactoryService.updatePassword(updatePasswordDto);
            await this.dataServices.accounts.update(idAccount, updateAccount);
            return successResponse("La contraseña se actualizó correctamente", null);
        } else {
            throw new HttpException(errorClientResponse('La contraseña actual es incorrecta', null), HttpStatus.BAD_REQUEST);
        }
    }
}