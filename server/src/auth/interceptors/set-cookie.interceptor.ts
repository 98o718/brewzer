import {
  Injectable,
  NestInterceptor,
  ExecutionContext,
  CallHandler,
  Global,
} from '@nestjs/common'
import { tap } from 'rxjs/operators'

@Global()
@Injectable()
export class SetCookieInterceptor implements NestInterceptor {
  constructor() {}

  async intercept(context: ExecutionContext, next: CallHandler) {
    const ctx = context.switchToHttp()
    const request = ctx.getRequest()
    const response = ctx.getResponse()

    request._cookies = []

    return next.handle().pipe(
      tap(() => {
        for (const { name, value, options } of request._cookies) {
          response.setCookie(name, value, options)
        }
      }),
    )
  }
}
