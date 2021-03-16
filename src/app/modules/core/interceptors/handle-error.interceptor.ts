import { catchError } from 'rxjs/operators';
import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor,
  HttpErrorResponse,
} from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { MatSnackBar } from '@angular/material/snack-bar';

@Injectable()
export class HandleErrorInterceptor implements HttpInterceptor {
  constructor(private _snackBar: MatSnackBar) {}

  intercept(
    request: HttpRequest<unknown>,
    next: HttpHandler
  ): Observable<HttpEvent<unknown>> {
    return next.handle(request).pipe(
      catchError((errorRes: HttpErrorResponse) => {
        let errorMessage: string = 'An unknown error occurred';
        if (errorRes.error instanceof ErrorEvent) {
          errorMessage = errorRes.error.message;
        }
        errorMessage = errorRes.error.status;
        this._snackBar.open(errorMessage, 'Close', {
          panelClass: 'snackbar-error',
          duration: 10000
        });
        return throwError(errorRes);
      })
    );
  }
}
