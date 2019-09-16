import { Document} from 'mongoose';

export interface ItemDocument extends Document {
    readonly  id: string;
    readonly  title: string;
    readonly  authors: object[];
    readonly  type: string;
    readonly  price: number;
}
