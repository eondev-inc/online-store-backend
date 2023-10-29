
import {Customer} from '../../customer/entities/customer.entity'
import {Order} from '../../order/entities/order.entity'


export class Shipment {
  shipmentId: number ;
shipmentDate: Date ;
address: string ;
city: string ;
state: string ;
country: string ;
zipCode: string ;
customerId: number ;
createdAt: Date ;
updatedAt: Date ;
Customer?: Customer ;
Order?: Order[] ;
}
