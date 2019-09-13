import { ApiModelProperty, ApiModelPropertyOptional } from '@nestjs/swagger';

export class RegistrationModel  {
    @ApiModelProperty()
    readonly userName: string;
    @ApiModelProperty()
    readonly password: string;
    @ApiModelProperty()
    readonly confirmPassword?: boolean;
    @ApiModelProperty()
    readonly email: string;
}
