import { Component, effect, EventEmitter, inject, Input, Output } from '@angular/core';

import { PriceMap } from '../../../api/models/price-map.interface';
import { TicketPack } from '../../../api/models/ticket-pack.interface';
import { OperationTypeEnum } from '../../../core/enums/operation-type.enum';
import { TicketTypeEnum } from '../../../core/enums/ticket-type.enum';
import { CartTicket } from '../../../core/interfaces/cart.interface';
import { CartService } from '../../../core/services/cart.service';
import { TicketTypesService } from '../../../core/services/ticket-types.service';
import { TicketSelectorCard } from '../ticket-selector-card/ticket-selector-card';

@Component({
  selector: 'app-ticket-list',
  imports: [TicketSelectorCard],
  templateUrl: './ticket-list.html',
  styleUrl: './ticket-list.css',
})
export class TicketList {
  @Input() priceMap: PriceMap | null = null;
  @Input() ticketPacks: TicketPack[] | null = null;
  @Input() selectedTicketsMap: Map<string, number> = new Map<string, number>();

  @Output() selectionChange = new EventEmitter<CartTicket>();

  ticketTypeEnum = TicketTypeEnum;
  operationTypeEnum = OperationTypeEnum;

  public onSelectionChange(
    ticketId: number,
    ticketType: TicketTypeEnum,
    ticketData: Partial<CartTicket>,
  ): void {
    const ticket: CartTicket = {
      ...ticketData,
      id: ticketId,
      ticketType: ticketType,
    } as CartTicket;

    this.selectionChange.emit(ticket);
  }
}
