import { Injectable } from '@nestjs/common';
import { PrismaService } from 'nestjs-prisma';
import { Order } from 'src/prisma/generated/order/entities/order.entity';

@Injectable()
export class OrderService {
    constructor(private prisma: PrismaService) {}

    async getOrderByCustomerId(customerId: number): Promise<Order[]> {
        return this.prisma.order.findMany({
            where: {
                customerId: customerId,
            },
        });
    }
}
