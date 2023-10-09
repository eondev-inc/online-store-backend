import { Customer } from '../../customer/entities/customer.entity';
import { Payment } from '../../payment/entities/payment.entity';
import { Shipment } from '../../shipment/entities/shipment.entity';
import { OrderItem } from '../../orderItem/entities/orderItem.entity';

export class Order {
    orderId: number;
    orderDate: Date;
    totalPrice: number;
    customerId: number;
    paymentId: number;
    shipmentId: number;
    createdAt: Date;
    updatedAt: Date;
    Customer?: Customer;
    Payment?: Payment;
    Shipment?: Shipment;
    OrderItem?: OrderItem[];
}
