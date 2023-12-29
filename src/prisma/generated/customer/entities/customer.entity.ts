import { Auth } from '../../auth/entities/auth.entity';
import { CustomerRole } from '../../customerRole/entities/customerRole.entity';
import { Shipment } from '../../shipment/entities/shipment.entity';
import { Payment } from '../../payment/entities/payment.entity';
import { Cart } from '../../cart/entities/cart.entity';
import { Wishlist } from '../../wishlist/entities/wishlist.entity';
import { Order } from '../../order/entities/order.entity';

export class Customer {
    customerId: number;
    firstName: string;
    lastName: string;
    email: string;
    address: string;
    phoneNumber: string;
    createdAt: Date;
    updatedAt: Date;
    Auth?: Auth[];
    CustomerRole?: CustomerRole[];
    Shipment?: Shipment[];
    Payment?: Payment[];
    Cart?: Cart[];
    Wishlist?: Wishlist[];
    Order?: Order[];
}
