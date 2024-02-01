import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma.service';

@Injectable()
export class CartService {
    constructor(private readonly prisma: PrismaService) {}

    getAllItems() {
        return this.prisma.cart.findMany();
    }

    getItemById(cartId: number) {
        return this.prisma.cart.findUnique({
            where: { cartId },
        });
    }

    getItemByUserId(userId: number) {
        return this.prisma.cart.findMany({
            where: {
                Customer: {
                    customerId: userId,
                },
            },
        });
    }

    createItem(data: any) {
        return this.prisma.cart.create({
            data,
        });
    }

    updateItem(cartId: number, data: any) {
        return this.prisma.cart.update({
            where: { cartId },
            data,
        });
    }

    deleteItem(cartId: number) {
        return this.prisma.cart.delete({
            where: { cartId },
        });
    }
}
