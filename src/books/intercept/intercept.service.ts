import { CallHandler, ExecutionContext, HttpException, HttpStatus, NestInterceptor } from "@nestjs/common";
import { Observable, throwError } from "rxjs";
import { TimeoutError } from "rxjs";
import { catchError, tap, timeout} from "rxjs/operators";

export class interceptor implements NestInterceptor {

    intercept(context: ExecutionContext, next: CallHandler): Observable<any>{
        console.log('before.......')

        const now = Date.now()
        const timeoutDuration = 30000

        return next.handle().pipe(timeout(timeoutDuration),
            tap(() => console.log(`After... ${Date.now() - now}/ms`)),
            catchError(err => {
                if(err instanceof TimeoutError){
                    return throwError(() => {new HttpException('Request time out', HttpStatus.REQUEST_TIMEOUT)})
                }
                return throwError(() => {})
            })
        )
    }
}