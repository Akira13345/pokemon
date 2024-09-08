import Redis from 'ioredis';
import env from "../start/env.js";
import logger from "../config/logger.js";

let redisInstance: Redis | null = null;

function initializeRedis(): Redis {
    if (redisInstance) {
        return redisInstance;
    }

    const newRedisInstance = new Redis({
        port: env.REDIS_PORT,
        host: env.REDIS_HOST,
        password: env.REDIS_PASSWORD,
    });

    newRedisInstance.on('error', (err) => {
        logger.error(err);
    });

    redisInstance = newRedisInstance;
    return redisInstance;
}

const redis: Redis = initializeRedis();

export default redis;
