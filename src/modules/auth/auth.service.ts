import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma.service';
import { LoginDto } from './dto/login.dto';
import { Prisma } from '@prisma/client';
import { HashService } from './hash.service';

@Injectable()
export class AuthService {
    constructor(
        private readonly prisma: PrismaService,
        private readonly hashService: HashService,
    ) {}

    async searchForLogin(input: LoginDto) {
        const user = await this.prisma.auth.findMany({
            where: {
                Customer: {
                    email: input.email,
                },
            },
        });
        if (!user) {
            return false;
        }
        return await this.hashService.compareHash(
            input.password,
            user[0].passwordHash,
        );
    }
}
