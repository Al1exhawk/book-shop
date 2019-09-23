import { Connection } from 'mongoose';
import { UserSchema } from '../../documents';
import { USER_MODEL, DATABASE_CONNECTION } from '../../environment/constants';

export const UserProviders = [
  {
    provide: USER_MODEL,
    useFactory: (connection: Connection) =>
      connection.model('User', UserSchema),
    inject: [DATABASE_CONNECTION],
  },
];
