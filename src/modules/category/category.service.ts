import { Injectable } from '@nestjs/common';
import { CategoryEntity } from './entity/category.entity';
import { PrismaService } from 'nestjs-prisma';
import { UpdateCategoryDto } from './dto/category.dto';

@Injectable()
export class CategoryService {
    constructor(private prisma: PrismaService) {}

    async createCategory(data: any): Promise<CategoryEntity> {
        return await this.prisma.category.create({ data });
    }

    async getCategoryById(id: number): Promise<CategoryEntity | null> {
        return this.prisma.category.findUnique({ where: { categoryId: id } });
    }

    async getAllCategories(): Promise<CategoryEntity[]> {
        return this.prisma.category.findMany();
    }

    async updateCategory(
        id: number,
        data: UpdateCategoryDto,
    ): Promise<CategoryEntity> {
        return this.prisma.category.update({ where: { categoryId: id }, data });
    }

    async deleteCategory(id: number): Promise<CategoryEntity> {
        return this.prisma.category.delete({ where: { categoryId: id } });
    }
}
