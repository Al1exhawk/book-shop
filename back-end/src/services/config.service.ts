import { parse } from 'dotenv';
import { Injectable } from '@nestjs/common';
import { DEFAULT_ENV } from '../environment/constants';
import { readFileSync } from 'fs';

@Injectable()
export class ConfigService {
    public readonly JWT_SECRET: string;
    public readonly MONGO_DB_CONNECTION_STRING: string;
    public readonly EXPIRES_IN: string;
    public readonly SEND_GRID_API: string;

    constructor() {
        const filePath: string = `src/environment/${process.env.NODE_ENV || DEFAULT_ENV}.env`;
        const envConfig = parse(readFileSync(filePath));

        this.JWT_SECRET = envConfig.JWT_SECRET;
        this.EXPIRES_IN = envConfig.EXPIRES_IN;
        this.MONGO_DB_CONNECTION_STRING = envConfig.MONGO_DB_CONNECTION_STRING;
        this.SEND_GRID_API = envConfig.SEND_GRID_API;
    }
}
