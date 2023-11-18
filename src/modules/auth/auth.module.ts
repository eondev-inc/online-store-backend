import { Module } from '@nestjs/common';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { PrismaService } from 'src/prisma.service';
import { HashService } from './hash.service';
import { JwtModule, JwtService } from '@nestjs/jwt';
import { AppConfigService } from 'src/commons/config/app/app-config.service';
import { AppConfig } from 'src/commons/config/app/enums/app-config.enum';
import { AppConfigModule } from 'src/commons/config/app/app-config.module';

@Module({
    imports: [
        AppConfigModule,
        JwtModule.registerAsync({
            useFactory: async (configService: AppConfigService) => ({
                secret: configService.get(AppConfig.JWT_SECRET),
                signOptions: {
                    expiresIn: configService.get(AppConfig.JWT_EXPIRES_IN),
                },
            }),
            imports: [AppConfigModule],
            inject: [AppConfigService],
        }),
    ],
    controllers: [AuthController],
    providers: [AuthService, PrismaService, HashService],
})
export class AuthModule {}
