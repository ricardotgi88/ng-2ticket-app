import { Component, inject, Input, OnChanges } from '@angular/core';

import { PriceMap } from '../../../core/data/models/price-maps.interface';
import { TicketTypesService } from '../../../core/services/ticket-types.service';
import { TicketSelectorCard } from '../ticket-selector-card/ticket-selector-card';

@Component({
  selector: 'app-ticket-list',
  imports: [TicketSelectorCard],
  templateUrl: './ticket-list.html',
  styleUrl: './ticket-list.css',
})
export class TicketList implements OnChanges {
  #ticketTypesService = inject(TicketTypesService);

  @Input() priceMap: PriceMap | null = null;

  isLoading = this.#ticketTypesService.isLoading;

  ngOnChanges(): void {
    if (this.priceMap?.mapping.every((m) => !m.ticketType)) {
      this.#ticketTypesService.enrichData();
    }
  }
}
