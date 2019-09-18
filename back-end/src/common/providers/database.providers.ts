import * as mongoose from 'mongoose';
import constants from '../../environment/constants';

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
