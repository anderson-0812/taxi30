import { Module } from "@nestjs/common";
import { DataServicesModule } from "../../services/database-services.module";
import { AccountFactoryService } from "./account-factory.service";
import { AccountUseCases } from "./account.use-cases";

@Module({
    imports: [DataServicesModule],
    providers: [AccountUseCases, AccountFactoryService],
    exports: [AccountUseCases, AccountFactoryService]
})
export class AccountUseCasesModule { }
