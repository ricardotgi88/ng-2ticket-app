import {
  Component,
  DestroyRef,
  Input,
  PLATFORM_ID,
  inject,
  signal,
} from '@angular/core';
import { isPlatformBrowser } from '@angular/common';
import { fromEvent, startWith, map } from 'rxjs';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { CoverImage } from '../cover-image/cover-image';
import { NgIcon, provideIcons } from '@ng-icons/core';
import { lucideInfo, lucideX } from '@ng-icons/lucide';
import { HlmCardImports } from '@spartan-ng/helm/card';
import { HlmButtonImports } from '@spartan-ng/helm/button';
import { Cart } from '../../../core/interfaces/cart.interface';
import { EventDatePipe } from '../../../core/pipes/event-date-pipe';
import { CurrencyPipe, NgTemplateOutlet } from '@angular/common';
import { RouterLink } from '@angular/router';

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
