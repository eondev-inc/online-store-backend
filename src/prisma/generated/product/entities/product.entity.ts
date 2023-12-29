import { Category } from '../../category/entities/category.entity';
import { Cart } from '../../cart/entities/cart.entity';
import { Wishlist } from '../../wishlist/entities/wishlist.entity';
import { OrderItem } from '../../orderItem/entities/orderItem.entity';

export class Product {
    productId: number;
    SKU: string;
    description: string;
    price: number;
    stock: number;
    categoryId: number;
    createdAt: Date;
    updatedAt: Date;
    Category?: Category;
    Cart?: Cart[];
    Wishlist?: Wishlist[];
    OrderItem?: OrderItem[];
}
