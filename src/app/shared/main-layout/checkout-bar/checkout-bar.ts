import { CurrencyPipe } from '@angular/common';
import { Component, inject } from '@angular/core';
import { NgIcon, provideIcons } from '@ng-icons/core';
import { lucideArrowLeft, lucideShoppingCart } from '@ng-icons/lucide';
import { HlmButtonImports } from '@spartan-ng/helm/button';
import { HlmIconImports } from '@spartan-ng/helm/icon';

import { AppPages } from '../../../core/enums/app-pages.enum';
import { RouteService } from '../../../core/services/route.service';
import { AppStore } from '../../../core/store/app-store';

@Component({
  selector: 'app-checkout-bar',
  imports: [HlmButtonImports, NgIcon, HlmIconImports, CurrencyPipe],
  providers: [provideIcons({ lucideArrowLeft, lucideShoppingCart })],
  templateUrl: './checkout-bar.html',
  styleUrl: './checkout-bar.css',
})
export class CheckoutBar {
  readonly #store = inject(AppStore);
  readonly #routeService = inject(RouteService);

  cart = this.#store.cart;
  currentPage = this.#routeService.currentPage;
  appPages = AppPages;

  onGoToPreviousPage(): void {
    this.#routeService.goToPreviousPage();
  }

  onCheckout(): void {
    this.#routeService.goToCheckout();
  }
}
