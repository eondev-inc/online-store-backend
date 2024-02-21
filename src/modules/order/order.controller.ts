import {
    Controller,
    Get,
    Post,
    UseGuards,
    UseInterceptors,
    Body,
    Request,
} from '@nestjs/common';
import { OrderService } from './order.service';
import { CreateOrderDto } from './dto/create-order.dto';
import { ApiBody, ApiProperty } from '@nestjs/swagger';
import { AuthGuard } from 'src/commons/guards/auth.guard';

@Controller('orders')
export class OrderController {
    constructor(private readonly _orderService: OrderService) {}

    @ApiProperty({
        description: 'Endpoint to get all orders by customer',
        name: 'Get All Orders by Customer',
    })
    @ApiBody({
        type: CreateOrderDto,
        examples: {
            orderOne: {
                value: {
                    customerId: 1,
                },
            },
        },
    })
    @UseGuards(AuthGuard)
    @Get()
    async getOrdersByCustomer(@Request() req) {
        const customerId = req.user.sub;
        return await this._orderService.getOrderByCustomerId(customerId);
    }
}
