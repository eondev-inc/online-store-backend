import { Customer } from '../../customer/entities/customer.entity';
import { Product } from '../../product/entities/product.entity';

export class Cart {
    cartId: number;
    quantity: number;
    customerId: number;
    productId: number;
    createdAt: Date;
    updatedAt: Date;
    Customer?: Customer;
    Product?: Product;
}
