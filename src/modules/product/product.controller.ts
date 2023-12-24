import { Controller, Get, Param, Post, Body } from '@nestjs/common';
import { ProductService } from './product.service';
import { CreateProductInput } from './dto/create-product.dto';

@Controller('product')
export class ProductController {
    constructor(private readonly _productService: ProductService) {}

    @Get('category/:category')
    getProductByCategory(@Param('category') category: string) {
        // Call the ProductService method to get products by category
        return this._productService.getProductsByCategory(category);
    }

    @Get(':id')
    getProductById(@Param('id') id: number) {
        // Call the ProductService method to get product by ID
        return this._productService.getProductById(id);
    }

    @Post()
    createProduct(@Body() createProductDto: CreateProductInput) {
        // Call the ProductService method to create a new product
        return this._productService.createProduct(createProductDto);
    }
}
