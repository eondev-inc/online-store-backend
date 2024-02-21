import { Module } from '@nestjs/common';
import { OrderController } from './order.controller';
import { OrderService } from './order.service';
import { PrismaService } from 'nestjs-prisma';
import { JwtService } from '@nestjs/jwt';

@Module({
    controllers: [OrderController],
    providers: [OrderService, PrismaService, JwtService],
})
export class OrderModule {}
