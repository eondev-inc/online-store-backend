import { Module } from '@nestjs/common';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { PrismaService } from 'src/prisma.service';
import { HashService } from './hash.service';
import { JwtModule, JwtService } from '@nestjs/jwt';
import { JWT_SECRET } from 'src/commons/constans';

@Module({
    imports: [
        JwtModule.register({
            secret: JWT_SECRET,
            signOptions: { expiresIn: '30d' },
            global: true,
        }),
    ],
    controllers: [AuthController],
    providers: [AuthService, PrismaService, HashService, JwtService],
})
export class AuthModule {}
