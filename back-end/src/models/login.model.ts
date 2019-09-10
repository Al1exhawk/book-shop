import { ApiModelProperty } from '@nestjs/swagger';

export class LoginModel {
    @ApiModelProperty()
    readonly userName: string;
    @ApiModelProperty()
    readonly password: string;
 }
