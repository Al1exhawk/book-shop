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
        const envCongig = parse(readFileSync(filePath));

        this.JWT_SECRET = envCongig.JWT_SECRET;
        this.EXPIRES_IN = envCongig.EXPIRES_IN;
        this.MONGO_DB_CONNECTION_STRING = envCongig.MONGO_DB_CONNECTION_STRING;
        this.SEND_GRID_API = envCongig.SEND_GRID_API;
    }
}
