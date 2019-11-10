import { Connection } from 'mongoose';
import { ItemSchema } from '../../documents';
import { ITEM_MODEL, DATABASE_CONNECTION } from '../../environment/constants';

export const ItemProviders = [
  {
    provide: ITEM_MODEL,
    useFactory: (connection: Connection) =>
      connection.model('Item', ItemSchema),
    inject: [DATABASE_CONNECTION],
  },
];
