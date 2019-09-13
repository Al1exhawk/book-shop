import { Document} from 'mongoose';

export interface UserDocument extends Document {
    readonly  id?: string;
    readonly  userName: string;
    readonly  role: string;
    readonly  password: string;
    readonly  confirmPassword?: boolean;
    readonly  email: string;
}
