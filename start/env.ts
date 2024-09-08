import Joi from 'joi';
import dotenv from 'dotenv';
import logger from '../config/logger.js';

dotenv.config();

const envSchema = Joi.object({
    BOT_TOKEN: Joi.string().required(),
    REDIS_HOST: Joi.string().required(),
    REDIS_PORT: Joi.number().required(),
    REDIS_PASSWORD: Joi.string().optional(),
}).unknown();

const { error, value: env } = envSchema.validate(process.env);

if (error) {
    logger.error(`Configuration validation error: ${error.message}`);
}

export default env;
