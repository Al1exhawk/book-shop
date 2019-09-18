import { ApiModelProperty } from '@nestjs/swagger';

export class PagingModel {
    @ApiModelProperty()
    page: number;
    @ApiModelProperty()
    contentPerPage: number;
}
