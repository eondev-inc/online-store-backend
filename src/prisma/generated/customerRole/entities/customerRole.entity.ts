
import {Customer} from '../../customer/entities/customer.entity'
import {Role} from '../../role/entities/role.entity'


export class CustomerRole {
  customerId: number ;
roleId: number ;
Customer?: Customer ;
Role?: Role ;
}
