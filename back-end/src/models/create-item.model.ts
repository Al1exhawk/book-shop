import * as mongoose from 'mongoose';
import { ApiModelProperty } from '@nestjs/swagger';

export class CreateItem {
    @ApiModelProperty()
    readonly title: string;
    @ApiModelProperty()
    readonly authors: [mongoose.Schema.Types.ObjectId];
    @ApiModelProperty()
    readonly type: string;
    @ApiModelProperty()
    readonly price: number;
}
