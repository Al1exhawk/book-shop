import { Connection } from 'mongoose';
import { AuthorSchema } from 'src/documents';

export const AuthorProviders = [
    {
        provide: 'AUTHOR_MODEL',
        useFactory: (connection: Connection) => connection.model('Author', AuthorSchema),
        inject: ['DATABASE_CONNECTION'],
    },
];
