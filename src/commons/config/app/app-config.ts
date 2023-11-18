import { registerAs } from '@nestjs/config';

export default registerAs('app', () => ({
    port: process.env.PORT,
    nodeEnd: process.env.NODE_ENV,
    fastifyAddress: process.env.FASTIFY_ADDRESS,
    databaseUrl: process.env.DATABASE_URL,
    appLocale: process.env.APP_LOCALE,
    appTizone: process.env.APP_TIMEZONE,
    jwtExpiresIn: process.env.JWT_EXPIRES_IN,
    jwtSecret: process.env.JWT_SECRET,
}));
