import { ApiModelProperty, ApiModelPropertyOptional } from '@nestjs/swagger';

export class QueryObjectModel {
    @ApiModelProperty()
    readonly minPrice: number;
    @ApiModelProperty()
    readonly maxPrice: number;
    @ApiModelProperty()
    readonly titleSearchString: string;
    @ApiModelProperty()
    readonly authorSearchString: string;
    @ApiModelProperty()
    readonly itemType: string[];
    @ApiModelProperty()
    readonly pageNumber: number;
    @ApiModelProperty()
    readonly itemsPerPage: number;
    @ApiModelPropertyOptional()
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
