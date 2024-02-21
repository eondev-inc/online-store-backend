import {
    IsString,
    IsNotEmpty,
    IsOptional,
    IsDateString,
} from 'class-validator';
import { CreateCategoryDto } from 'src/prisma/generated/category/dto/create-category.dto';

export class CategoryDto extends CreateCategoryDto {
    @IsString()
    @IsNotEmpty()
    categoryId: string;

    @IsString()
    @IsNotEmpty()
    name: string;

    @IsString()
    @IsNotEmpty()
    description: string;

    @IsDateString()
    @IsOptional()
    createdAt?: string;

    @IsDateString()
    @IsOptional()
    updatedAt?: string;

    @IsString()
    @IsOptional()
    status?: string;
}

export class UpdateCategoryDto {
    @IsString()
    @IsOptional()
    name?: string;

    @IsString()
    @IsOptional()
    description?: string;

    @IsString()
    @IsOptional()
    status?: string;
}
