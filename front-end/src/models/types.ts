export interface ActionTemplate  {
    readonly type: string;
    readonly payload?: any;
} 

export interface LoginPayload  {
    readonly userName: string;
    readonly password: string;    
}

export interface FilterForm {
    readonly minPrice: number,
    readonly maxPrice: number,
    readonly titleSearchString:string,
    readonly authorSearchString: string,
    readonly itemType: string[]
}