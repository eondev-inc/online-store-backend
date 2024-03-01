import { Injectable } from '@nestjs/common';
import { PrismaService } from 'nestjs-prisma';
import { Customer } from './customer.model';

@Injectable()
export class CustomerService {
    constructor(private prisma: PrismaService) {}

    async create(data: Partial<Customer>): Promise<Customer> {
        return this.prisma.customer.create({ data });
    }

    async findAll(): Promise<Customer[]> {
        return this.prisma.customer.findMany();
    }

    async findOne(id: number): Promise<Customer | null> {
        return this.prisma.customer.findUnique({ where: { id } });
    }

    async update(
        id: number,
        data: Partial<Customer>,
    ): Promise<Customer | null> {
        return this.prisma.customer.update({ where: { id }, data });
    }

    async remove(id: number): Promise<Customer | null> {
        return this.prisma.customer.delete({ where: { id } });
    }
}
