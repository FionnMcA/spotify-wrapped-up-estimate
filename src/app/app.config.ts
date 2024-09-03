import { ApplicationConfig, inject, provideZoneChangeDetection } from '@angular/core';
import { provideRouter } from '@angular/router';

import { routes } from './app.routes';
import { HttpHandlerFn, HttpRequest, provideHttpClient, withInterceptors } from '@angular/common/http';
import { AuthService } from './shared/services/auth.service';

function authInterceptor(request: HttpRequest<unknown>, next: HttpHandlerFn){
  const authService = inject(AuthService)
  const accessToken = authService.token
  if(accessToken){
    const req = request.clone({
      headers: request.headers.set('Authorization', `Bearer ${accessToken}`)
    })
    return next(req)
  }
  return next(request)
}

export const appConfig: ApplicationConfig = {
  providers: [provideZoneChangeDetection({ eventCoalescing: true }), provideRouter(routes), provideHttpClient(withInterceptors([authInterceptor]))]
};
