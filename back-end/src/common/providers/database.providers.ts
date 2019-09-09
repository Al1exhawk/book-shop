import constants from 'src/environment/constants';
import * as mongoose from 'mongoose';

export const DatabaseProviders = [
  {
    provide: 'DATABASE_CONNECTION',
    useFactory: (): Promise<typeof mongoose> =>
      mongoose.connect(constants.mongoURI, {
        useNewUrlParser: true,
        useFindAndModify: false,
      }),
  },
];
