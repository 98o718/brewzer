import {
  Injectable,
  NestInterceptor,
  ExecutionContext,
  CallHandler,
} from '@nestjs/common'
import { JwtService } from '@nestjs/jwt'

@Injectable()
export class RefreshTokenInterceptor implements NestInterceptor {
  constructor(private readonly jwtService: JwtService) {}

  async intercept(context: ExecutionContext, next: CallHandler) {
    const request = context.switchToHttp().getRequest()

    const { authorization } = request.headers

    if (authorization) {
      const token = authorization.startsWith('Bearer ')
        ? authorization.substring(7, authorization.length)
        : null

      try {
        const { exp, iat, ...rest } = await this.jwtService.verifyAsync(token)
        const newToken = await this.jwtService.signAsync({ ...rest })
        request.newToken = newToken
      } catch (error) {
        console.log(error)
      }
    }
    return next.handle()
  }
}
