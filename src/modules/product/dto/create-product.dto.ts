import { IsObject, IsOptional } from 'class-validator';
import { CreateProductDto } from 'src/prisma/generated/product/dto/create-product.dto';
import { Category } from '../../../prisma/generated/category/entities/category.entity';

export class CreateProductInput extends CreateProductDto {
    @IsObject()
    @IsOptional()
    category?: Category;
}
