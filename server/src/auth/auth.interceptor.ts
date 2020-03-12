import {
  Injectable,
  NestInterceptor,
  ExecutionContext,
  CallHandler,
  Inject,
  forwardRef,
} from '@nestjs/common'
import { JwtService } from '@nestjs/jwt'

@Injectable()
export class AuthInterceptor implements NestInterceptor {
  constructor(private readonly jwtService: JwtService) {}

  async intercept(context: ExecutionContext, next: CallHandler) {
    const request = context.switchToHttp().getRequest()

    const { authorization } = request.headers

    if (authorization) {
      const token = authorization.startsWith('Bearer ')
        ? authorization.substring(7, authorization.length)
        : null

      try {
        const { sub, username } = await this.jwtService.verifyAsync(token)
        request.user = { userId: sub, username }
      } catch (error) {
        request.user = null
      }
    } else {
      request.user = null
    }
    return next.handle()
  }
}
