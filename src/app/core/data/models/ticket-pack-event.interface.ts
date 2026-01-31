import { Event } from './event.interface';

export interface TicketPackEvent {
  eventId: number;
  event: Event;
  eventPlaceId: number;
}
