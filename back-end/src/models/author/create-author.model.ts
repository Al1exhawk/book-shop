import { Types } from 'mongoose';
import { ApiModelProperty } from '@nestjs/swagger';

export class CreateAuthorModel {
    @ApiModelProperty()
    readonly firstName: string;
    @ApiModelProperty()
    readonly lastName: string;
    @ApiModelProperty()
    readonly items: [Types.ObjectId];
}
