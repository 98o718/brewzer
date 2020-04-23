import { IsNotEmpty, IsString, IsOptional } from 'class-validator'
import { ApiModelProperty } from '@nestjs/swagger'

export class AddCommentDto {
  @ApiModelProperty()
  @IsNotEmpty()
  @IsString()
  entity: string

  @ApiModelProperty()
  @IsNotEmpty()
  @IsString()
  text: string
}
