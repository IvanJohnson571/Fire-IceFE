import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { SessionService } from '../services/session.service';

export const authGuard: CanActivateFn = async () => {
  const sessionService = inject(SessionService);
  const router = inject(Router);

  const isAuthenticated = await sessionService.checkSession();

  if (isAuthenticated) return true;

  await router.navigateByUrl('/login');
  return false;
};
