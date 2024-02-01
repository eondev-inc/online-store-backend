import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma.service';
import { ProductEntity } from './entities/product.entity';
import { CreateProductInput } from './dto/create-product.dto';
import { parse } from 'csv-parse';
import { createReadStream } from 'fs';

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
                SKU: product.SKU,
                description: product.description,
                price: product.price,
                stock: product.stock,
                Category: {
                    connect: {
                        categoryId: product.category.categoryId,
                    },
                },
            },
        });
    }

    async createProductsFromCSV(
        csvFile: Express.Multer.File,
    ): Promise<ProductEntity[]> {
        return new Promise((resolve, reject) => {
            const products: CreateProductInput[] = [];
            createReadStream(csvFile.path)
                .pipe(parse({ delimiter: ';', columns: true }))
                .on('data', (data) => {
                    products.push({
                        SKU: data.SKU,
                        description: data.description,
                        price: parseFloat(data.price),
                        stock: parseInt(data.stock),
                        category: {
                            categoryId: parseInt(data.categoryId),
                        },
                    });
                })
                .on('end', async () => {
                    for (const product of products) {
                        try {
                            const createdProduct =
                                await this.createProduct(product);
                            products.push({
                                ...createdProduct,
                                category: {
                                    categoryId:
                                        createdProduct.Category.categoryId,
                                },
                            });
                        } catch (error) {
                            reject(error);
                        }
                    }
                });
        });
    }
}
