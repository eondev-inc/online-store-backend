import { Module } from '@nestjs/common';
import { CategoryController } from './category.controller';
import { CategoryService } from './category.service';
import { PrismaService } from 'nestjs-prisma';

@Module({
    controllers: [CategoryController],
    providers: [CategoryService, PrismaService],
})
export class CategoryModule {}
