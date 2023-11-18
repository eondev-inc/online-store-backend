import {
    IsString,
    MinLength,
    MaxLength,
    IsNotEmpty,
    IsEmail,
    IsPhoneNumber,
} from 'class-validator';

export class CreateCustomer {
    @IsNotEmpty()
    @IsString()
    firstName: string;

    @IsNotEmpty()
    @IsString()
    lastName: string;

    @IsNotEmpty()
    @IsString()
    @IsEmail()
    email: string;

    @IsNotEmpty()
    @IsString()
    address: string;

    @IsNotEmpty()
    @IsString()
    @IsPhoneNumber('CL')
    phoneNumber: string;

    @IsNotEmpty()
    @IsString()
    @MinLength(6)
    @MaxLength(20)
    password: string;

    @IsNotEmpty()
    @IsString()
    @MinLength(6)
    @MaxLength(20)
    confirmPassword: string;
}
