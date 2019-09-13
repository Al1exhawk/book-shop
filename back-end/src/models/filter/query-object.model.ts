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

/*  VALIDATION EXEMPLE
    const queryObject: QueryObjectModel = {
      minPrice: min && (min >= 0) && (min < max) ? min  : 0,
      maxPrice: max && (max >= 0) && (max > min) ? max  : Infinity,
      titleSearchRegExp: title ? new RegExp(title, 'ig') : /\w/ ,
      authorSearchRegExp: author ? new RegExp(author, 'ig') : /\w/,
      itemType: type ? [type] : ['magazine', 'book'],
      pageNumber: page ? page : 1,
      itemsPerPage: 10,
    };
*/
