import { Controller, Post, Body, ValidationPipe } from '@nestjs/common'
import { FilesService } from './files.service'
import { UploadAvatarDto } from './dto/upload-avatar.dto'
import { ApiUseTags, ApiOperation } from '@nestjs/swagger'

@Controller('files')
@ApiUseTags('Files')
export class FilesController {
  constructor(private readonly filesService: FilesService) {}
  //TODO JWT auth
  @Post('avatar')
  @ApiOperation({ title: 'Upload avatar' })
  async upload(
    @Body(
      new ValidationPipe({
        disableErrorMessages: true,
      }),
    )
    uploadAvatarDto: UploadAvatarDto,
  ): Promise<any> {
    const { avatar } = uploadAvatarDto

    return await this.filesService.uploadAvatar(avatar[0])
  }
}
