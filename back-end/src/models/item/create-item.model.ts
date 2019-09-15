// import { ObjectId } from 'mongoose';
import { ApiModelProperty } from '@nestjs/swagger';

export class CreateItemModel {
    @ApiModelProperty()
    readonly title: string;
    @ApiModelProperty()
    readonly authors: string[];
    @ApiModelProperty()
    readonly type: string;
    @ApiModelProperty()
    readonly price: number;
}
