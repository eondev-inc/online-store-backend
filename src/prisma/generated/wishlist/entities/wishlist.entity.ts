import { Customer } from '../../customer/entities/customer.entity';
import { Product } from '../../product/entities/product.entity';

export class Wishlist {
    wishlistId: number;
    customerId: number;
    productId: number;
    createdAt: Date;
    updatedAt: Date;
    Customer?: Customer;
    Product?: Product;
}
