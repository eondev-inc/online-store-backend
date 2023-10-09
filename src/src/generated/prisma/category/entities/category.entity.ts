import { Product } from '../../product/entities/product.entity';

export class Category {
    categoryId: number;
    name: string;
    createdAt: Date;
    updatedAt: Date;
    Product?: Product[];
}
