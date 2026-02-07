import { Component, EventEmitter, Input, Output } from '@angular/core';

import { Event } from '../../../api/models/event.interface';
import { EventDatePipe } from '../../../core/pipes/event-date-pipe';
import { CoverImage } from '../cover-image/cover-image';

@Component({
  selector: 'app-event-card',
  imports: [CoverImage, EventDatePipe],
  templateUrl: './event-card.html',
  styleUrl: './event-card.css',
})
export class EventCard {
  @Input() event: Event = {} as Event;
  @Output() selected: EventEmitter<Event> = new EventEmitter<Event>();

  onSelect() {
    this.selected.emit(this.event);
  }
}
