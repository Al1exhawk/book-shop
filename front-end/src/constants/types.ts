import { match } from 'react-router';
import { History, Location,  } from 'history';

export interface ActionTemplate  {
    readonly type: string;
    readonly payload?: any;
} 

export interface LoginPayload  {
    readonly userName: string;
    readonly password: string;    
}

export interface AuthState  {
    readonly userName: string;
    readonly role: string;
    readonly token: string;
    readonly errorMassage: string;
}

export interface IRoutProps {
    readonly location: Location,
    readonly history: History,
    readonly match: match
}