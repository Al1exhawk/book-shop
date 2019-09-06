import { ApiModelProperty } from '@nestjs/swagger';

export class Login {
    @ApiModelProperty()
    readonly userName: string;
    @ApiModelProperty()
    readonly password: string;
 }
