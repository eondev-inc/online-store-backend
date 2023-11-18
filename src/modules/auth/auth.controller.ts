import {
    Body,
    Controller,
    Get,
    Header,
    HttpCode,
    Logger,
    Post,
    Request,
    UseGuards,
    UseInterceptors,
} from '@nestjs/common';
import { LoginDto } from './dto/login.dto';
import { AuthService } from './auth.service';
import { ApiBody, ApiProperty } from '@nestjs/swagger';
import { AuthGuard } from 'src/commons/guards/auth.guard';
import { CreateCustomer } from './dto/create-customer.dto';
import { ResponseInterceptor } from 'src/commons/interceptors/index';

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
    @UseInterceptors(ResponseInterceptor)
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
        type: CreateCustomer,
        examples: {
            registerOne: {
                value: {
                    firstName: 'test',
                    lastName: 'test',
                    email: 'test@test.cl',
                    address: 'test address',
                    phoneNumber: '123456789',
                    password: 'test',
                    confirmPassword: 'test',
                },
            },
        },
    })
    @HttpCode(201)
    @Post('register')
    @Header('Content-Type', 'application/json')
    async register(@Body() createcustomer: CreateCustomer): Promise<any> {
        return await this._authService.registerNewCustomer(createcustomer);
    }
}
