import {
  Matches,
  ArrayMaxSize,
  ValidateNested,
  Equals,
  IsIn,
  IsOptional,
} from 'class-validator'
import { Type } from 'class-transformer'
import { ApiModelProperty } from '@nestjs/swagger'

export class Avatar {
  @ApiModelProperty()
  data: Buffer

  @ApiModelProperty()
  filename: string

  @ApiModelProperty()
  encoding: string

  @ApiModelProperty()
  @IsIn(['image/jpeg', 'image/png'])
  mimetype: string

  @ApiModelProperty()
  @Equals(false)
  limit: boolean
}

export class UploadAvatarDto {
  @IsOptional()
  @ArrayMaxSize(1)
  @Type(() => Avatar)
  @ValidateNested()
  @ApiModelProperty({ isArray: true, type: Avatar })
  avatar: Avatar[]
}
