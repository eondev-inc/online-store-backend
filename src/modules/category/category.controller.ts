import {
    Controller,
    Get,
    Post,
    Put,
    Delete,
    Body,
    Param,
} from '@nestjs/common';
import { CategoryService } from './category.service';
import { CategoryDto, UpdateCategoryDto } from './dto/category.dto';

@Controller('categories')
export class CategoryController {
    constructor(private readonly categoryService: CategoryService) {}

    @Get()
    findAll() {
        return this.categoryService.getAllCategories();
    }

    @Get(':id')
    findOne(@Param('id') id: number) {
        return this.categoryService.getCategoryById(id);
    }

    @Post()
    create(@Body() createCategoryDto: CategoryDto) {
        return this.categoryService.createCategory(createCategoryDto);
    }

    @Put(':id')
    update(
        @Param('id') id: number,
        @Body() updateCategoryDto: UpdateCategoryDto,
    ) {
        return this.categoryService.updateCategory(id, updateCategoryDto);
    }

    @Delete(':id')
    remove(@Param('id') id: number) {
        return this.categoryService.deleteCategory(id);
    }
}
