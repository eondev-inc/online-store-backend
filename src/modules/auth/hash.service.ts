import { Injectable } from '@nestjs/common';
import * as bcrypt from 'bcrypt';

@Injectable()
export class HashService {
    private saltRounds = 10;
    private salt = bcrypt.genSaltSync(this.saltRounds);
    /*
     * This method is used to generate a hash from a password
     * @param password string
     * @returns Promise<string>
     */
    async generateHash(password: string): Promise<string> {
        return await bcrypt.hash(password, this.salt);
    }

    /*
     * This method is used to compare a password with a hash
     * @param password string
     * @param hash string
     * @returns Promise<boolean>
     */
    async compareHash(password: string, hash: string): Promise<boolean> {
        return await bcrypt.compare(password, hash);
    }
}
