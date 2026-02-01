import { Component, inject, Input, OnChanges } from '@angular/core';

import { PriceMap } from '../../../api/models/price-map.interface';
import { TicketTypesService } from '../../../core/services/ticket-types.service';
import { TicketSelectorCard } from '../ticket-selector-card/ticket-selector-card';
import { TicketPack } from '../../../api/models/ticket-pack.interface';
import { CartService } from '../../../core/services/cart.service';
import { TicketTypeEnum } from '../../../core/enums/ticket-type.enum';
import { OperationTypeEnum } from '../../../core/enums/operation-type.enum';
import { CartTicket } from '../../../core/interfaces/cart-ticket.interface';

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

  isLoading = this.#ticketTypesService.isLoading;
  ticketTypeEnum = TicketTypeEnum;
  operationTypeEnum = OperationTypeEnum;

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
