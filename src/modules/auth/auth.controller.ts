import {
    Body,
    Controller,
    Get,
    Header,
    HttpCode,
    Logger,
    Post,
    Req,
    Request,
    UseGuards,
} from '@nestjs/common';
import { LoginDto } from './dto/login.dto';
import { AuthService } from './auth.service';
import { ApiBody, ApiProperty, ApiResponse } from '@nestjs/swagger';
import { AuthGuard } from 'src/commons/guards/auth.guard';
import { CreateCustomerDto } from 'src/prisma/generated/customer/dto/create-customer.dto';
import { Customer } from 'src/prisma/generated/customer/entities/customer.entity';

@Controller('auth')
export class AuthController {
    private readonly logger = new Logger(AuthController.name);
    constructor(private readonly _authService: AuthService) {}
    @ApiProperty({
        description: 'Endpoint to login',
        name: 'Login',
    })
    @ApiBody({
        type: LoginDto,
        examples: {
            loginOne: {
                value: {
                    email: 'test@test.cl',
                    password: 'test',
                },
            },
        },
    })
    @Post('login')
    async login(@Body() loginBody: LoginDto) {
        return await this._authService.login(loginBody);
    }
    @ApiProperty({
        description: 'Endpoint to get profile',
        name: 'Profile',
    })
    @Get('profile')
    @UseGuards(AuthGuard)
    async getProfile(@Request() req) {
        const customerId = req.user.sub;
        return await this._authService.getProfile(customerId);
    }

    @ApiProperty({
        description: 'Endpoint to register a new Customer',
        name: 'Register',
    })
    @ApiBody({
        type: CreateCustomerDto,
        examples: {
            registerOne: {
                value: {
                    firstName: 'test',
                    lastName: 'test',
                    email: 'test@test.cl',
                    address: 'test address',
                    phoneNumber: '123456789',
                    password: 'test',
                },
            },
        },
    })
    @HttpCode(200)
    @Post('register')
    @Header('Content-Type', 'application/json')
    async register(@Req() req): Promise<any> {
        const customer: CreateCustomerDto = {
            email: req.body.email,
            password: req.body.password,
            firstName: req.body.firstName,
            lastName: req.body.lastName,
            address: req.body.address,
            phoneNumber: req.body.phoneNumber,
        };
        this.logger.log(JSON.stringify(customer));
        return await this._authService.registerNewCustomer(customer);
    }
}
