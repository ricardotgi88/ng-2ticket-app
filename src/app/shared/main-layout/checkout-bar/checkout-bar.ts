import { Component } from '@angular/core';
import { NgIcon, provideIcons } from '@ng-icons/core';
import { lucideArrowLeft, lucideShoppingCart } from '@ng-icons/lucide';
import { HlmButtonImports } from '@spartan-ng/helm/button';
import { HlmIconImports } from '@spartan-ng/helm/icon';

@Component({
  selector: 'app-checkout-bar',
  imports: [HlmButtonImports, NgIcon, HlmIconImports],
  providers: [provideIcons({ lucideArrowLeft, lucideShoppingCart })],
  templateUrl: './checkout-bar.html',
  styleUrl: './checkout-bar.css',
})
export class CheckoutBar {
  onGoBack() {
    window.history.back();
  }
}
