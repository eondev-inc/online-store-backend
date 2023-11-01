import {
    ConflictException,
    Injectable,
    NotFoundException,
} from '@nestjs/common';
import { PrismaService } from 'src/prisma.service';
import { LoginDto } from './dto/login.dto';
import { HashService } from './hash.service';
import { JwtService } from '@nestjs/jwt';
import { LoggingConfigService } from 'src/commons/config/logging/logging-config.service';
import { Customer } from 'src/prisma/generated/customer/entities/customer.entity';
import { CreateCustomerDto } from 'src/prisma/generated/customer/dto/create-customer.dto';
@Injectable()
export class AuthService {
    private readonly logger = LoggingConfigService.getInstance().getLogger();
    constructor(
        private readonly prisma: PrismaService,
        private readonly hashService: HashService,
        private readonly jwtService: JwtService,
    ) {}

    async login(input: LoginDto) {
        const user = await this.prisma.auth.findMany({
            where: {
                Customer: {
                    email: input.email,
                },
            },
            select: {
                authId: true,
                customerId: true,
                passwordHash: true,
                Customer: true,
            },
        });
        if (user.length === 0 || !user) {
            throw new NotFoundException('User not found');
        }
        this.logger.log(user);
        const isUserOk = await this.hashService.compareHash(
            input.password,
            user[0].passwordHash,
        );

        if (!isUserOk) {
            throw new NotFoundException('User or Password are incorrect');
        }

        const payload = {
            sub: user[0].customerId,
            email: user[0].Customer.email,
        };
        return await this.jwtService.signAsync(payload);
    }
    /**
     * Method to get customer profile
     * @param customerId
     * @returns Customer
     */
    async getProfile(customerId: number): Promise<Customer> {
        const user: Customer = await this.prisma.customer.findUnique({
            where: {
                customerId,
            },
        });
        if (!user) {
            throw new NotFoundException('User not found');
        }
        return user;
    }

    async registerNewCustomer(customer: CreateCustomerDto) {
        const { email, password } = customer;
        delete customer.password;
        const existingCustomer: Customer[] =
            await this.prisma.customer.findMany({
                where: {
                    email,
                },
            });
        this.logger.debug(existingCustomer);
        if (!existingCustomer) {
            throw new ConflictException('Email already exists');
        }
        this.logger.log(password);
        const passwordHash = await this.hashService.generateHash(password);
        this.logger.log(passwordHash);
        const customerCreated = await this.prisma.customer.create({
            data: {
                ...customer,
                Auth: {
                    create: {
                        passwordHash,
                        provider: 'local',
                    },
                },
            },
            include: {
                Auth: true,
            },
        });

        return customerCreated;
    }
}
