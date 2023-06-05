import { Module } from "@nestjs/common";

import { DataServicesModule } from "../../services/database-services.module";
import { AuthUseCasesModule } from "../auth";
import { PersonFactoryService } from "./person-factory.service";
import { PersonUseCases } from "./person.use-cases";

@Module({
    imports: [DataServicesModule, AuthUseCasesModule],
    providers: [PersonFactoryService, PersonUseCases],
    exports: [PersonFactoryService, PersonUseCases]
})
export class PersonUseCasesModule { }