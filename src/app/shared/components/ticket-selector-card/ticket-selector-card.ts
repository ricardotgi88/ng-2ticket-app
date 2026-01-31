import { CurrencyPipe } from '@angular/common';
import { Component, Input } from '@angular/core';
import { provideIcons } from '@ng-icons/core';
import { lucideCheck, lucideChevronDown } from '@ng-icons/lucide';
import { HlmBadgeImports } from '@spartan-ng/helm/badge';
import { HlmButtonImports } from '@spartan-ng/helm/button';
import { HlmCardImports } from '@spartan-ng/helm/card';
import { HlmInputImports } from '@spartan-ng/helm/input';
import { HlmLabelImports } from '@spartan-ng/helm/label';

import { PriceMap } from '../../../core/data/models/price-maps.interface';
import { PriceMapItem } from '../../../core/data/models/price-maps-item.interface';

@Component({
  selector: 'app-ticket-selector-card',
  imports: [
    HlmCardImports,
    HlmLabelImports,
    HlmInputImports,
    HlmButtonImports,
    HlmBadgeImports,
    CurrencyPipe,
  ],
  providers: [provideIcons({ lucideCheck, lucideChevronDown })],
  templateUrl: './ticket-selector-card.html',
  host: {
    class: 'contents',
  },
  styleUrl: './ticket-selector-card.css',
})
export class TicketSelectorCard {
  @Input() priceMapItem: PriceMapItem | null = null;
  @Input() priceMap: PriceMap | null = null;
}
