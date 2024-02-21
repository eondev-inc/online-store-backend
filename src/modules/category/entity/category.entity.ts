import { Category } from 'src/prisma/generated/category/entities/category.entity';

export class CategoryEntity extends Category {
    constructor(partial: Partial<CategoryEntity>) {
        super();
        Object.assign(this, partial);
    }
}
