import { IsNotEmpty, IsIn } from 'class-validator'
import { ApiModelProperty } from '@nestjs/swagger'

export class RateRecipeDto {
  @ApiModelProperty()
  @IsNotEmpty()
  @IsIn([0, 1, 2, 3, 4])
  vote: number
}
