import { Body, Controller, Get, Param, Post, Put, UseGuards } from "@nestjs/common";
import { ApiBadRequestResponse, ApiBearerAuth, ApiResponse, ApiTags } from "@nestjs/swagger";

import { ErrorUpdatePasswordDto, SucccessGetAccountDto, SucccessSetProfilesDto, SuccessUpdatePasswordDto } from "../core/dtos/responses";
import { SetProfilesDto, UpdatePasswordDto } from "../core/dtos";
import { JwtAuthGuard } from "../frameworks/auth/guards/jwt.auth.guard";
import { AccountUseCases } from "../use-cases/accounts";

@ApiBearerAuth()
@ApiTags('Cuenta')
@Controller('/api/account')
export class AccountController {
    constructor(private accountUseCases: AccountUseCases) { }

    @UseGuards(JwtAuthGuard)
    @Get('/:id')
    @ApiResponse({
        status: 200,
        description: 'Cuenta obtenida correctamente',
        type: SucccessGetAccountDto
    })
    getAccount(@Param('id') idAccount: number) {
        return this.accountUseCases.getAccount(idAccount);
    }

    @UseGuards(JwtAuthGuard)
    @Post('/set-profiles')
    @ApiResponse({
        status: 201,
        description: 'Perfiles asignados a la cuenta de manera correcta',
        type: SucccessSetProfilesDto
    })
    setProfilesAccount(@Body() setProfilesDto: SetProfilesDto) {
        return this.accountUseCases.setProfilesInAccount(setProfilesDto);
    }

    @UseGuards(JwtAuthGuard)
    @Put('/update-password/:id')
    @ApiResponse({
        status: 201,
        description: 'Actualización de contraseña realizado correctamente',
        type: SuccessUpdatePasswordDto
    })
    @ApiBadRequestResponse({
        status: 400,
        description: 'La contraseña actual ingresada no es correcta o faltan campos en el cuerpo de la petición',
        type: ErrorUpdatePasswordDto
    })
    updatePassword(@Param('id') idAccount: number, @Body() updatePasswordDto: UpdatePasswordDto) {
        return this.accountUseCases.updatePassword(idAccount, updatePasswordDto);
    }
}