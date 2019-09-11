export interface QueryObjectModel {
    readonly minPrice: number;
    readonly maxPrice: number;
    readonly titleSearchRegExp: RegExp;
    readonly authorSearchRegExp: RegExp;
    readonly itemType: string[];
    readonly pageNumber: number;
    readonly itemsPerPage: number;
    itemsIdsFromSearchResult?: string[];
}
