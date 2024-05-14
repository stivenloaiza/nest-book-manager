import {
  CallHandler,
  ExecutionContext,
  Injectable,
  NestInterceptor,
  RequestTimeoutException,
} from '@nestjs/common';
import { Observable, tap } from 'rxjs';

@Injectable()
export class TimeoutStivenInterceptor implements NestInterceptor {
  intercept(context: ExecutionContext, next: CallHandler): Observable<any> {
    const currentDate = Date.now();
    console.log(`Ingreso al endpoint: ${currentDate}`);
    return next.handle().pipe(
      tap(() => {
        const resultTimeExecution = Date.now() - currentDate;
        console.log(`After... ${resultTimeExecution} ms`);
        if (resultTimeExecution >= 30000) {
          console.log('Pase por aquí 1');
          throw new RequestTimeoutException('Lo siento el servidor esta lento');
        }
      }),
    );
  }
}
