import { ApiModelProperty } from '@nestjs/swagger';

export class LoginModel {
    @ApiModelProperty( {default: 'Alex23Hawk'} )
    readonly userName: string;
    @ApiModelProperty( {default: '123'} )
    readonly password: string;
 }
