import { Product } from '../../product/entities/product.entity';
import { Order } from '../../order/entities/order.entity';

export class OrderItem {
    orderItemId: number;
    quantity: number;
    price: number;
    productId: number;
    orderId: number;
    createdAt: Date;
    updatedAt: Date;
    Product?: Product;
    Order?: Order;
}
