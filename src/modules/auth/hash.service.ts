import { Injectable } from '@nestjs/common';
import * as bcrypt from 'bcrypt';

@Injectable()
export class HashService {
    /*
     * This method is used to generate a hash from a password
     * @param password string
     * @returns Promise<string>
     */
    async generateHash(password: string): Promise<string> {
        try {
            const salt = await bcrypt.genSalt(10);
            const hashedPassword = bcrypt.hashSync(password, salt);
            return hashedPassword;
        } catch (error) {
            console.error(error);
            return null;
        }
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
