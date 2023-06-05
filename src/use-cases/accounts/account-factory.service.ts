import { Injectable } from "@nestjs/common";
import * as bcrypt from "bcrypt";

import { SetProfilesDto, UpdatePasswordDto } from "src/core/dtos";
import { Account } from "../../core/entities";

@Injectable()
export class AccountFactoryService {

    setProfiles(accountDto: SetProfilesDto) {
        const account = new Account();
        account.idAccount = accountDto.idAccount;
        account.profiles = accountDto.profiles;

        return account;
    }

    async updatePassword(updatePasswordDto: UpdatePasswordDto) {
        const account = new Account();
        account.password = await bcrypt.hash(updatePasswordDto.newPassword, 10);
        return account;
    }
}