import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor,
} from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable()
export class ApiKeyInterceptor implements HttpInterceptor {
  apiKey = environment.apikey;

  constructor() {}

  intercept(
    request: HttpRequest<unknown>,
    next: HttpHandler
  ): Observable<HttpEvent<unknown>> {
    const reqClone = request.clone({
      params: request.params.append('apikey', this.apiKey),
    });
    return next.handle(reqClone);
  }
}
