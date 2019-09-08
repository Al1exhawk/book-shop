import { ApiModelProperty } from '@nestjs/swagger';

export class Item {
  @ApiModelProperty()
  readonly id: string;
  @ApiModelProperty()
  readonly title: string;
  @ApiModelProperty()
  readonly authors: any[];
  @ApiModelProperty()
  readonly type: string;
  @ApiModelProperty()
  readonly price: number;
}
