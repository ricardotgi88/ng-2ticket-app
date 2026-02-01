import { CurrencyPipe } from '@angular/common';
import { Component, EventEmitter, Input, Output } from '@angular/core';
import { provideIcons } from '@ng-icons/core';
import { lucideCheck, lucideChevronDown } from '@ng-icons/lucide';
import { HlmBadgeImports } from '@spartan-ng/helm/badge';
import { HlmButtonImports } from '@spartan-ng/helm/button';
import { HlmCardImports } from '@spartan-ng/helm/card';
import { HlmInputImports } from '@spartan-ng/helm/input';
import { HlmLabelImports } from '@spartan-ng/helm/label';

import { PriceMap } from '../../../api/models/price-map.interface';
import { PriceMapItem } from '../../../api/models/price-map-item.interface';
import { CartTicket } from '../../../core/interfaces/cart-ticket.interface';

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
  @Input() name = '';
  @Input() description = '';
  @Input() price = 0;
  @Input() selected = 0;
  @Input() maxSelection = -1;
  @Input() remainingTickets = -1;

  @Output() changed = new EventEmitter<Partial<CartTicket>>();
  @Output() added = new EventEmitter<void>();
  @Output() removed = new EventEmitter<void>();

  onAdd(): void {
    this.selected += 1;
    this.added.emit();
    this.#changed();
  }

  onRemove(): void {
    this.selected = this.selected > 0 ? this.selected - 1 : 0;
    this.removed.emit();
    this.#changed();
  }

  #changed(): void {
    const ticket: Partial<CartTicket> = {
      amount: this.selected,
      price: this.price,
      total: this.price * this.selected,
    };

    this.changed.emit(ticket);
  }
}
