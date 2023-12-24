import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma.service';
import { ProductEntity } from './entities/product.entity';
import { CreateProductInput } from './dto/create-product.dto';

@Injectable()
export class ProductService {
    constructor(private readonly prismaService: PrismaService) {}
    // Method to get products by category
    async getProductsByCategory(category: string): Promise<ProductEntity[]> {
        // Logic to fetch products by category from the database
        return await this.prismaService.product.findMany({
            include: {
                Category: true,
            },
            where: {
                Category: {
                    name: category,
                },
            },
        });
    }

    // Method to get product by ID
    async getProductById(id: number): Promise<ProductEntity> {
        // Logic to fetch product by ID from the database
        return await this.prismaService.product.findFirst({
            where: {
                productId: id,
            },
        });
    }

    async createProduct(product: CreateProductInput): Promise<ProductEntity> {
        // Logic to create a product in the database
        return await this.prismaService.product.create({
            data: {
                ...product,
                Category: {
                    connect: {
                        categoryId: product.category.categoryId,
                    },
                },
            },
        });
    }
}
