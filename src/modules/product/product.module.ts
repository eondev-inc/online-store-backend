import { Module } from '@nestjs/common';
import { ProductController } from './product.controller';
import { AppConfigModule } from 'src/commons/config/app/app-config.module';
import { ProductService } from './product.service';
import { PrismaService } from 'src/prisma.service';
import { JwtService } from '@nestjs/jwt';

@Module({
    imports: [AppConfigModule],
    controllers: [ProductController],
    providers: [ProductService, PrismaService, JwtService],
})
export class ProductModule {}
