
import {Customer} from '../../customer/entities/customer.entity'
import {Order} from '../../order/entities/order.entity'


export class Payment {
  paymentId: number ;
paymentDate: Date ;
paymentMethod: string ;
amount: number ;
customerId: number ;
createdAt: Date ;
updatedAt: Date ;
Customer?: Customer ;
Order?: Order[] ;
}
