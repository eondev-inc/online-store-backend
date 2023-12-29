import { IsObject, IsOptional, IsNumber, IsString } from 'class-validator';
import { CreateProductDto } from 'src/prisma/generated/product/dto/create-product.dto';
import { Category } from '../../../prisma/generated/category/entities/category.entity';
import { ApiProperty } from '@nestjs/swagger';

export class CreateProductInput extends CreateProductDto {
    @IsString()
    @ApiProperty({ example: 'SKU-1234567890' })
    SKU: string;

    @IsString()
    @ApiProperty({ example: 'This is a product description' })
    description: string;

    @IsNumber({
        allowInfinity: false,
        allowNaN: false,
        maxDecimalPlaces: 2,
    })
    @ApiProperty({ example: 100 })
    price: number;

    @IsNumber({
        allowInfinity: false,
        allowNaN: false,
    })
    @ApiProperty({ example: 100 })
    stock: number;

    @IsObject()
    @IsOptional()
    category?: Category;
}
