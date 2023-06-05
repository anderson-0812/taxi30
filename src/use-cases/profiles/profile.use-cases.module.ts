import { Module } from "@nestjs/common";
import { DataServicesModule } from "../../services/database-services.module";
import { ProfileFactoryService } from "./profile-factory.service";
import { ProfileUseCases } from "./profile.use-cases";

@Module({
    imports: [DataServicesModule],
    providers: [ProfileUseCases, ProfileFactoryService],
    exports: [ProfileUseCases, ProfileFactoryService]
})
export class ProfileUseCasesModule { }