import { Component, effect, inject, Input, OnChanges } from '@angular/core';

import { PriceMap } from '../../../api/models/price-map.interface';
import { TicketPack } from '../../../api/models/ticket-pack.interface';
import { OperationTypeEnum } from '../../../core/enums/operation-type.enum';
import { TicketTypeEnum } from '../../../core/enums/ticket-type.enum';
import { CartTicket } from '../../../core/interfaces/cart-ticket.interface';
import { CartService } from '../../../core/services/cart.service';
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
  #cartService = inject(CartService);

  @Input() priceMap: PriceMap | null = null;
  @Input() ticketPacks: TicketPack[] | null = null;

  selectedTicketsMap: Map<string, number> = new Map();
  isLoading = this.#ticketTypesService.isLoading;
  ticketTypeEnum = TicketTypeEnum;
  operationTypeEnum = OperationTypeEnum;

  constructor() {
    effect(() => {
      const selectedTickets = this.#cartService.getSelectedTickets();
      const newMap = new Map<string, number>();

      for (const ticket of selectedTickets) {
        const id =
          ticket.ticketType === TicketTypeEnum.ticketPack
            ? ticket.ticketPackId
            : ticket.priceMapItemId;
        const key = `${ticket.ticketType}-${id}`;
        newMap.set(key, ticket.amount ?? 0);
      }

      this.selectedTicketsMap = newMap;
    });
  }

  ngOnChanges(): void {
    this.#ticketTypesService.enrichData();
  }

  onSelectionChange(
    ticketId: number,
    ticketType: TicketTypeEnum,
    ticketData: Partial<CartTicket>,
  ): void {
    const ticket: Partial<CartTicket> = {
      ...ticketData,
      ticketType: ticketType,
      ticketPackId: ticketType === TicketTypeEnum.ticketPack ? ticketId : null,
      priceMapItemId: ticketType === TicketTypeEnum.priceMap ? ticketId : null,
      priceMapId: ticketType === TicketTypeEnum.priceMap ? (this.priceMap?.id ?? null) : null,
    };
    this.#cartService.updateCart(ticket);
  }
}
