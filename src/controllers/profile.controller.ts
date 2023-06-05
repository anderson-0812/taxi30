import { Body, Controller, Get, Param, Post, Put, UseGuards } from "@nestjs/common";
import { ApiTags, ApiResponse, ApiBearerAuth } from '@nestjs/swagger';

import { AllProfilesSuccessDto, CreateProfileSuccessDto, UpdateProfileSuccessDto, UpdateStatusProfileSuccessDto } from "../core/dtos/responses";
import { CreateProfileDto, UpdateActiveDto, UpdateProfileDto } from "../core/dtos";
import { JwtAuthGuard } from "../frameworks/auth/guards/jwt.auth.guard";
import { ProfileUseCases } from "../use-cases/profiles";

@ApiBearerAuth()
@ApiTags('Perfiles')
@Controller('/api/profile')
export class ProfileController {
    constructor(private profileUseCases: ProfileUseCases) { }

    @UseGuards(JwtAuthGuard)
    @ApiResponse({
        status: 201,
        description: "Registrar nuevo perfil.",
        type: CreateProfileSuccessDto
    })
    @Post('/create')
    createProfile(@Body() createProfileDto: CreateProfileDto) {
        return this.profileUseCases.createProfile(createProfileDto);
    }

    @UseGuards(JwtAuthGuard)
    @Get('/all')
    @ApiResponse({
        status: 200,
        description: "Obtener todos los perfiles disponibles.",
        type: AllProfilesSuccessDto
    })
    getAllProfiles() {
        return this.profileUseCases.getAllProfiles();
    }

    @UseGuards(JwtAuthGuard)
    @ApiResponse({
        status: 200,
        description: "Actualizar la información de perfil.",
        type: UpdateProfileSuccessDto
    })
    @Put('/update/:id')
    updateProfile(@Param('id') idProfile: number, @Body() updateProfileDto: UpdateProfileDto) {
        return this.profileUseCases.updateProfile(idProfile, updateProfileDto);
    }

    @UseGuards(JwtAuthGuard)
    @ApiResponse({
        status: 200,
        description: "Actualizar el estado del perfil (Activo/Inactivo).",
        type: UpdateStatusProfileSuccessDto
    })
    @Put('/update-active/:id')
    updateActiveProfile(@Param('id') idProfile: number, @Body() updateActiveDto: UpdateActiveDto) {
        return this.profileUseCases.updateActiveProfile(idProfile, updateActiveDto);
    }
}