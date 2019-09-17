import { ApiModelProperty } from '@nestjs/swagger';

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

}
