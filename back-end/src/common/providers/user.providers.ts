import { Connection } from 'mongoose';
import { UserSchema } from 'src/documents';

export const UserProviders = [
    {
        provide: 'USER_MODEL',
        useFactory: (connection: Connection) => connection.model('User', UserSchema),
        inject: ['DATABASE_CONNECTION'],
    },
];
