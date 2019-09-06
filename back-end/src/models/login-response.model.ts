import { ApiModelProperty } from '@nestjs/swagger';

export class LoginResponse {
    @ApiModelProperty()
    readonly userName: string;
    @ApiModelProperty()
    readonly role: string;
    @ApiModelProperty()
    readonly token: string;
 }
