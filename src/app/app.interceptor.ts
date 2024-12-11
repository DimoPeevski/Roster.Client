import { HttpInterceptorFn } from '@angular/common/http';

const API = '/api';
const apiUrl = 'https://localhost:7115/api';

export const appInterceptor: HttpInterceptorFn = (req, next) => {
  if (req.url.startsWith(API)) {
    req = req.clone({
      url: req.url.replace(API, apiUrl),
      withCredentials: true,
    });
  }

  return next(req);
};
