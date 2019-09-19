import { ApiModelProperty } from '@nestjs/swagger';

export class RegistrationModel {
  @ApiModelProperty()
  readonly userName: string;
  @ApiModelProperty()
  readonly password: string;
  @ApiModelProperty()
  readonly email: string;
}
