import { Component, Input } from '@angular/core';
import { Event } from '../../../core/interfaces/event.interface';

@Component({
  selector: 'app-event-info-card',
  imports: [],
  templateUrl: './event-info-card.html',
  styleUrl: './event-info-card.css',
})
export class EventInfoCard {
  @Input() event: Event = {} as Event;
}
