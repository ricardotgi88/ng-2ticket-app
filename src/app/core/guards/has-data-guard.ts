import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { AppStore } from '../store/app-store';

export const hasDataGuard: CanActivateFn = () => {
  const cart = inject(AppStore).cart();
  if (cart.tickets.length) {
    return true;
  }

  inject(Router).navigate(['/events']);
  return false;
};
