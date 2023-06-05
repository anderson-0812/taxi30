import { Injectable, Logger } from "@nestjs/common";
import { Cron, CronExpression } from "@nestjs/schedule";
import { exec } from "child_process";

@Injectable()
export class CleanMemoryRamProvider {
    private readonly logger = new Logger(CleanMemoryRamProvider.name);

    @Cron(CronExpression.EVERY_30_MINUTES)
    showEveryFiveSeconds(){
        exec('sync && sudo sysctl -w vm.drop_caches=3');
        this.logger.debug("Este mensaje se muestra cada 30 minutos (limpiando memoria RAM)");
    }
}