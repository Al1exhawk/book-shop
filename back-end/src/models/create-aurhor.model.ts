import * as mongoose from 'mongoose';
import { ApiModelProperty } from '@nestjs/swagger';

export class CreateAuthor {
    @ApiModelProperty()
    readonly firstName: string;
    @ApiModelProperty()
    readonly lastName: string;
    @ApiModelProperty()
    readonly items: [mongoose.Schema.Types.ObjectId];
}
