import { CurrencyPipe } from '@angular/common';
import { Component, inject } from '@angular/core';
import { NgIcon, provideIcons } from '@ng-icons/core';
import { lucideArrowLeft, lucideFlag, lucideShoppingCart, lucideUser2 } from '@ng-icons/lucide';
import { HlmButtonImports } from '@spartan-ng/helm/button';
import { HlmIconImports } from '@spartan-ng/helm/icon';

import { RouteService } from '../../../core/services/route.service';
import { AppStore } from '../../../core/store/app-store';

@Component({
  selector: 'app-header',
  imports: [HlmButtonImports, NgIcon, HlmIconImports, CurrencyPipe],
  providers: [provideIcons({ lucideArrowLeft, lucideUser2, lucideShoppingCart, lucideFlag })],
  templateUrl: './header.html',
  styleUrl: './header.css',
})
export class Header {
  readonly #store = inject(AppStore);
  readonly #routeService = inject(RouteService);

  cart = this.#store.cart;

  onGoBack() {
    this.#routeService.goToEvents();
  }

  onCheckout(): void {
    this.#routeService.goToCheckout();
  }
}
