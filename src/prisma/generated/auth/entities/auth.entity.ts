
import {Customer} from '../../customer/entities/customer.entity'


export class Auth {
  authId: number ;
customerId: number ;
provider: string ;
providerId: string  | null;
passwordHash: string  | null;
createdAt: Date ;
updatedAt: Date ;
Customer?: Customer ;
}
