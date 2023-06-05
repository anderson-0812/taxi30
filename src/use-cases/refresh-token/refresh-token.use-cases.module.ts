import { Module } from "@nestjs/common";
import { DataServicesModule } from "../../services/database-services.module";

import { RefreshTokenFactoryService } from "./refresh-token-factory.service";
import { RefreshTokenUseCases } from "./refresh-token.use-cases";

@Module({
    imports: [DataServicesModule],
    providers: [RefreshTokenUseCases, RefreshTokenFactoryService],
    exports: [RefreshTokenUseCases, RefreshTokenFactoryService]
})
export class RefreshTokenUseCasesModule { }