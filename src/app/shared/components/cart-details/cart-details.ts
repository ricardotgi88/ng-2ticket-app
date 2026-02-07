import { isPlatformBrowser } from '@angular/common';
import { CurrencyPipe, NgTemplateOutlet } from '@angular/common';
import { Component, DestroyRef, inject, Input, PLATFORM_ID, signal } from '@angular/core';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { RouterLink } from '@angular/router';
import { NgIcon, provideIcons } from '@ng-icons/core';
import { lucideInfo, lucideX } from '@ng-icons/lucide';
import { HlmButtonImports } from '@spartan-ng/helm/button';
import { HlmCardImports } from '@spartan-ng/helm/card';
import { fromEvent, map, startWith } from 'rxjs';

import { Cart } from '../../../core/interfaces/cart.interface';
import { EventDatePipe } from '../../../core/pipes/event-date-pipe';
import { CoverImage } from '../cover-image/cover-image';

@Component({
  selector: 'app-cart-details',
  imports: [
    NgIcon,
    CoverImage,
    HlmCardImports,
    HlmButtonImports,
    EventDatePipe,
    CurrencyPipe,
    RouterLink,
    NgTemplateOutlet,
  ],
  providers: [provideIcons({ lucideInfo, lucideX })],

  templateUrl: './cart-details.html',
  styleUrl: './cart-details.css',
})
export class CartDetails {
  @Input() cart: Cart | null = null;
  readonly isMobile = signal(false);

  constructor() {
    const platformId = inject(PLATFORM_ID);
    const destroyRef = inject(DestroyRef);

    if (isPlatformBrowser(platformId)) {
      fromEvent(window, 'resize')
        .pipe(
          startWith(null),
          map(() => window.matchMedia('(max-width: 767px)').matches),
          takeUntilDestroyed(destroyRef),
        )
        .subscribe((isMobile) => this.isMobile.set(isMobile));
    }
  }
}
