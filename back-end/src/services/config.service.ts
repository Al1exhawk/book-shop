import { config } from 'dotenv';
import { Injectable } from '@nestjs/common';
import { DEFAULT_ENV } from '../environment/constants';

@Injectable()
export class ConfigService {
    get JWT_SECRET() {
        return process.env.JWT_SECRET;
    }
    get MAIL_JWT_SECRET() {
        return process.env.MAIL_JWT_SECRET;
    }
    get MONGO_DB_CONNECTION_STRING() {
        return process.env.MONGO_DB_CONNECTION_STRING;
    }
    get EXPIRES_IN() {
        return process.env.EXPIRES_IN;
    }
    get SEND_GRID_API() {
        return process.env.SEND_GRID_API;
    }
    get STRIPE_SECRET_API_KEY() {
        return process.env.STRIPE_SECRET_API_KEY;
    }

    constructor() {
        const filePath: string = `src/environment/${process.env.NODE_ENV || DEFAULT_ENV}.env`;
        config({path: filePath});
    }
}
