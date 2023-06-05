import { Module } from "@nestjs/common";
import { JwtModule } from "@nestjs/jwt";

import { AuthServicesModule } from "../../services/auth-services.module";
import { DataServicesModule } from "../../services/database-services.module";
import { AuthFactoryService } from "./auth-factory.service";
import { AuthUseCases } from "./auth.use-cases";

@Module({
    imports: [DataServicesModule, AuthServicesModule],
    providers: [AuthFactoryService, AuthUseCases],
    exports: [AuthFactoryService, AuthUseCases]
})
export class AuthUseCasesModule { }