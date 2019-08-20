import { Connection } from 'mongoose';
import { ItemSchema } from '../models/item.schema';

export const ItemProviders = [
    {
        provide: 'ITEM_MODEL',
        useFactory: (connection: Connection) => connection.model('Item', ItemSchema),
        inject: ['DATABASE_CONNECTION'],
    }
];