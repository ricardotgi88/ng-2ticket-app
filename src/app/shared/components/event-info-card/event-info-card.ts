import { DatePipe } from '@angular/common';
import { Component, EventEmitter, Input, Output } from '@angular/core';

import { Event } from '../../../core/data/models/event.interface';

@Component({
  selector: 'app-event-info-card',
  imports: [DatePipe],
  templateUrl: './event-info-card.html',
  styleUrl: './event-info-card.css',
})
export class EventInfoCard {
  @Input() event: Event = {} as Event;
  @Output() selected: EventEmitter<Event> = new EventEmitter<Event>();

  onSelect() {
    this.selected.emit(this.event);
  }
}
