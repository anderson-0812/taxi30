import { Injectable } from "@nestjs/common";

import { responseDetail, successResponse } from "../../helpers/responses";
import { IDataServices } from "../../core/abstracts";
import { CreateProfileDto, UpdateActiveDto, UpdateProfileDto } from "../../core/dtos";
import { ProfileFactoryService } from "./profile-factory.service";
import { ERROR_CODE_OK, INTERNAL_CODE_EMPTY_LIST } from "../../helpers/codeResponse";

@Injectable()
export class ProfileUseCases {
    constructor(
        private dataServices: IDataServices,
        private profileFactoryService: ProfileFactoryService
    ) { }

    async createProfile(createProfileDto: CreateProfileDto) {
        const profile = this.profileFactoryService.createProfile(createProfileDto);
        const newProfile = await this.dataServices.profiles.create(profile);
        return successResponse("Perfil creado exitosamente", newProfile);
    }

    async getAllProfiles() {
        const profiles = await this.dataServices.profiles.getAll('modules', '', { active: true });
        if (profiles.length <= 0) {
            return responseDetail(INTERNAL_CODE_EMPTY_LIST, null, ERROR_CODE_OK, "Listado de perfiles vacía", null);
        }
        return successResponse("Listado de Perfiles obtenido exitosamente", profiles);
    }

    async updateProfile(idProfile: number, updateProfileDto: UpdateProfileDto) {
        const profile = this.profileFactoryService.updateProfile(idProfile, updateProfileDto);
        await this.dataServices.profiles.create(profile);
        return successResponse("Perfil actualizado exitosamente", null);
    }

    async updateActiveProfile(idProfile: number, updateActiveDto: UpdateActiveDto) {
        await this.dataServices.profiles.update(idProfile, { active: updateActiveDto.active });
        return successResponse("El estado del perfil se ha actualizado exitosamente", null);
    }
}