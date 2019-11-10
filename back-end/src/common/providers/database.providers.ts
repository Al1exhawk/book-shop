import * as mongoose from 'mongoose';
import { ConfigService } from '../../services';
import { DATABASE_CONNECTION } from '../../environment/constants';

export const DatabaseProviders = [
  {
    provide: DATABASE_CONNECTION,
    useFactory: (): Promise<typeof mongoose> => {
      const config = new ConfigService();
      return mongoose.connect(config.MONGO_DB_CONNECTION_STRING, {
        useNewUrlParser: true,
        useFindAndModify: false,
      });
    },
  },
];
