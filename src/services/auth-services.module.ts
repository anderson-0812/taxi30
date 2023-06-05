import { Module } from '@nestjs/common';
import { AuthModule } from '../frameworks/auth/auth-service.module';

@Module({
    imports: [AuthModule],
    exports: [AuthModule]
})
export class AuthServicesModule { }