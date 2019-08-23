import constants from "src/environment/constants"
import * as mongoose from 'mongoose';

export const databaseProviders = [
  {
    provide: 'DATABASE_CONNECTION',
    useFactory: (): Promise<typeof mongoose> =>
      mongoose.connect(constants.mongoURI, {
        useNewUrlParser: true,
        useFindAndModify: false,
      }),
  },
];