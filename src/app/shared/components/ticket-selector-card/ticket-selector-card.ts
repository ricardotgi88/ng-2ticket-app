import { CurrencyPipe } from '@angular/common';
import { Component, DestroyRef, EventEmitter, Input, Output, inject } from '@angular/core';
import { FormControl, ReactiveFormsModule } from '@angular/forms';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { startWith, pairwise } from 'rxjs';
import { HlmBadgeImports } from '@spartan-ng/helm/badge';
import { HlmCardImports } from '@spartan-ng/helm/card';

import { CartTicket } from '../../../core/interfaces/cart.interface';
import { AmountSelector } from '../form/amount-selector/amount-selector';

@Component({
  selector: 'app-ticket-selector-card',
  imports: [HlmCardImports, HlmBadgeImports, AmountSelector, ReactiveFormsModule, CurrencyPipe],
  templateUrl: './ticket-selector-card.html',
  host: {
    class: 'contents',
  },
  styleUrl: './ticket-selector-card.css',
})
export class TicketSelectorCard {
  readonly #destroyRef = inject(DestroyRef);
  readonly amountControl = new FormControl(0, { nonNullable: true });

  @Input() name = '';
  @Input() description = '';
  @Input() price = 0;
  @Input() set selected(value: number) {
    const nextValue = value ?? 0;
    this.amountControl.setValue(nextValue, { emitEvent: false });
  }
  @Input() maxSelection = -1;
  @Input() remainingTickets = -1;

  @Output() changed = new EventEmitter<Partial<CartTicket>>();
  @Output() added = new EventEmitter<void>();
  @Output() removed = new EventEmitter<void>();

  constructor() {
    this.amountControl.valueChanges
      .pipe(startWith(this.amountControl.value), pairwise(), takeUntilDestroyed(this.#destroyRef))
      .subscribe(([previous, current]) => {
        if (current === previous) return;
        if (current > previous) {
          this.added.emit();
        } else if (current < previous) {
          this.removed.emit();
        }
        this.#changed(current);
      });
  }

  #changed(amount: number): void {
    const ticket: Partial<CartTicket> = {
      name: this.name,
      amount,
      price: this.price,
      total: this.price * amount,
    };

    this.changed.emit(ticket);
  }
}
