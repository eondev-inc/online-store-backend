import { Test, TestingModule } from '@nestjs/testing';
import { AuthController } from '../auth.controller';
import { AuthService } from '../auth.service';
import { LoginDto } from '../dto/login.dto';
import { CreateCustomer } from '../dto/create-customer.dto';
import { AuthGuard } from 'src/commons/guards/auth.guard';
import { ResponseInterceptor } from 'src/commons/interceptors/index';
import { Customer } from '../../../prisma/generated/customer/entities/customer.entity';

describe('AuthController', () => {
    let controller: AuthController;
    let authService: AuthService;

    beforeEach(async () => {
        const module: TestingModule = await Test.createTestingModule({
            controllers: [AuthController],
            providers: [AuthService],
        })
            .overrideGuard(AuthGuard)
            .useValue({ canActivate: () => true })
            .overrideInterceptor(ResponseInterceptor)
            .useValue({})
            .compile();

        controller = module.get<AuthController>(AuthController);
        authService = module.get<AuthService>(AuthService);
    });

    it('should be defined', () => {
        expect(controller).toBeDefined();
    });

    describe('login', () => {
        it('should call authService.login and return the result', async () => {
            const loginDto: LoginDto = {
                email: 'test@test.cl',
                password: 'test',
            };
            const expectedResult = { token: 'un Token' }; // Replace with expected result

            jest.spyOn(authService, 'login').mockResolvedValue(expectedResult);

            const result = await controller.login(loginDto);

            expect(authService.login).toHaveBeenCalledWith(loginDto);
            expect(result).toBe(expectedResult);
        });
    });

    describe('getProfile', () => {
        it('should call authService.getProfile and return the result', async () => {
            const customerId = '1';
            const expectedResult: Customer = {
                customerId: 1,
                firstName: 'Yerffrey',
                lastName: 'Romero',
                email: 'test@test.cl',
                address: 'Avenida Siempre Viva 123',
                phoneNumber: '+56945355060',
                createdAt: new Date(),
                updatedAt: new Date(),
            };

            jest.spyOn(authService, 'getProfile').mockResolvedValue(
                expectedResult,
            );
            jest.spyOn(authService, 'getProfile').mockResolvedValue(
                expectedResult,
            );

            const result = await controller.getProfile(customerId);

            expect(authService.getProfile).toHaveBeenCalledWith(customerId);
            expect(result).toBe(expectedResult);
        });
    });

    describe('register', () => {
        it('should call authService.registerNewCustomer and return the result', async () => {
            const createCustomerDto: CreateCustomer = {
                firstName: 'test',
                lastName: 'test',
                email: 'test@test.cl',
                address: 'test address',
                phoneNumber: '123456789',
                password: 'test',
                confirmPassword: 'test',
            };
            const expectedResult = {
                customerId: 2,
                firstName: 'Yerffrey',
                lastName: 'Romero',
                email: 'test@aguaviva.cl',
                address: 'Avenida Siempre Viva 123',
                phoneNumber: '+56945355060',
                createdAt: new Date(),
                updatedAt: new Date(),
                Auth: [
                    {
                        authId: 2,
                        customerId: 2,
                        provider: 'local',
                        providerId: null,
                        passwordHash:
                            '$2b$10$OuWCshGdRLQQl8y.Ym.25uqubk5PaF2VRn2TBMAgqNNCKG4fIE30C',
                        createdAt: new Date(),
                        updatedAt: new Date(),
                    },
                ],
            }; // Replace with expected result

            jest.spyOn(authService, 'registerNewCustomer').mockResolvedValue(
                expectedResult,
            );

            const result = await controller.register(createCustomerDto);

            expect(authService.registerNewCustomer).toHaveBeenCalledWith(
                createCustomerDto,
            );
            expect(result).toBe(expectedResult);
        });
    });
});
