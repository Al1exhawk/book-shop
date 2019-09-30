export interface ActionTemplate {
    readonly type: string;
    readonly payload?: any;
} 

export interface LoginPayload {
    readonly userName: string;
    readonly password: string;    
}
