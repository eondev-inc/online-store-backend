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
import { CreateCustomer } from './dto/create-customer.dto';
@Injectable()
export class AuthService {
    private readonly logger = LoggingConfigService.getInstance().getLogger();
    constructor(
        private readonly prisma: PrismaService,
        private readonly hashService: HashService,
        private readonly jwtService: JwtService,
    ) {}
    /**
     * Method to login user and return token
     * @param email
     * @param password
     * @returns Token
     */
    async login({ email, password }: LoginDto) {
        const user = await this.prisma.auth.findFirst({
            where: {
                Customer: {
                    email: email,
                },
            },
            select: {
                authId: true,
                customerId: true,
                passwordHash: true,
                Customer: true,
            },
        });
        if (!user) {
            throw new NotFoundException('User not found');
        }
        this.logger.log(user);
        const isUserOk = await this.hashService.compareHash(
            password,
            user.passwordHash,
        );

        if (!isUserOk) {
            throw new NotFoundException('User or Password are incorrect');
        }

        const payload = {
            sub: user.customerId,
            email: user.Customer.email,
        };
        const token = await this.jwtService.signAsync(payload);
        return { token };
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
    /**
     * Method to register a new customer
     * @param customer
     * @returns Customer
     */
    async registerNewCustomer(customer: CreateCustomer) {
        const { email, password, confirmPassword } = customer;
        const existingCustomer: Customer = await this.prisma.customer.findFirst(
            {
                where: {
                    email,
                },
            },
        );
        if (existingCustomer) {
            throw new ConflictException('Email already exists');
        }
        if (password !== confirmPassword) {
            throw new ConflictException('Passwords do not match');
        }
        const passwordHash = await this.hashService.generateHash(password);
        const customerCreated = await this.prisma.customer.create({
            data: {
                firstName: customer.firstName,
                lastName: customer.lastName,
                email: customer.email,
                address: customer.address,
                phoneNumber: customer.phoneNumber,
                Auth: {
                    create: {
                        passwordHash,
                        provider: 'local',
                    },
                },
            },
            include: {
                Auth: false,
            },
        });

        return customerCreated;
    }
}
