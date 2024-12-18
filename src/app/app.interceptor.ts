import { HttpInterceptorFn } from '@angular/common/http';
import { catchError } from 'rxjs';
import { ErrorMessageService } from './shared/error-message/error-message.service';
import { Router } from '@angular/router';
import { inject } from '@angular/core';

const API = '/api';
const apiUrl = 'https://localhost:7115/api';

export const appInterceptor: HttpInterceptorFn = (req, next) => {
  if (req.url.startsWith(API)) {
    req = req.clone({
      url: req.url.replace(API, apiUrl),
      withCredentials: true,
    });
  }

  const errorMsgService = inject(ErrorMessageService);
  const router = inject(Router);

  return next(req).pipe(
    catchError((err) => {
      if (err.status === 401) {
        router.navigate(['/login']);
      } else {
        errorMsgService.setError(err);
        router.navigate(['/error']);
      }

      return [err];
    })
  );
};
