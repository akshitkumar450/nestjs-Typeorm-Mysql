import {
  UseInterceptors,
  NestInterceptor,
  ExecutionContext,
  CallHandler,
} from '@nestjs/common';
import { plainToClass } from 'class-transformer';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

export class SerializeInterceptor implements NestInterceptor {
  intercept(
    context: ExecutionContext,
    next: CallHandler<any>,
  ): Observable<any> | Promise<Observable<any>> {
    //run something before a request is handled by the request handler
    console.log('1.before handler', context);
    return next.handle().pipe(
      map((data: any) => {
        // run something before the response is sent out(outgoing data)
        console.log('3.before response is sent out', data);
      }),
    );
  }
}
