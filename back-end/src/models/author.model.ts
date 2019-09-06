import { ApiModelProperty } from '@nestjs/swagger';

export class Author {
    @ApiModelProperty()
    readonly id?: string;
    @ApiModelProperty()
    readonly firstName: string;
    @ApiModelProperty()
    readonly lastName: string;
    @ApiModelProperty()
    readonly items: any[];
}
