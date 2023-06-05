import { Injectable } from "@nestjs/common";
import { CreateProfileDto, UpdateProfileDto } from "../../core/dtos";
import { Profile } from "../../core/entities";

@Injectable()
export class ProfileFactoryService {
    createProfile(createProfileDto: CreateProfileDto) {
        const profile = new Profile();
        profile.name = createProfileDto.name;
        profile.description = createProfileDto.description;
        // profile.modules = createProfileDto.modules;
        return profile;
    }

    updateProfile(idProfile: any, updateProfileDto: UpdateProfileDto) {
        const profile = new Profile;
        profile.idProfile = parseInt(idProfile);
        profile.name = updateProfileDto.name;
        profile.description = updateProfileDto.description;
        // profile.modules = updateProfileDto.modules;
        return profile;
    }
}