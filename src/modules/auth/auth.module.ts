import { Module } from '@nestjs/common';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { PrismaService } from 'src/prisma.service';
import { HashService } from './hash.service';

@Module({
    controllers: [AuthController],
    providers: [AuthService, PrismaService, HashService],
})
export class AuthModule {}
