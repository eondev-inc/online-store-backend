import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AppConfigModule } from './commons/config/app/app-config.module';
import { PrismaService } from './prisma.service';
import { ConfigModule } from '@nestjs/config';
import { AuthModule } from './modules/auth/auth.module';

@Module({
    imports: [ConfigModule.forRoot(), AppConfigModule, AuthModule],
    controllers: [AppController],
    providers: [AppService, PrismaService],
})
export class AppModule {}
