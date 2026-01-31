import { Event } from '../data/models/event.interface';
import { Cart } from '../interfaces/cart.interface';

/**
 * Custom equality function for Event comparison.
 * Compares events by their ID to prevent unnecessary updates.
 */
export const eventEquality = (a: Event | null, b: Event | null): boolean => {
  if (a === null && b === null) return true;
  if (a === null || b === null) return false;
  return a.id === b.id;
};

/**
 * Custom equality function for Event array comparison.
 * Compares arrays of events by their IDs to prevent unnecessary updates.
 */
export const eventsEquality = (a: Event[], b: Event[]): boolean => {
  if (a.length !== b.length) return false;
  return a.every((event, index) => event.id === b[index].id);
};

/**
 * Custom equality function for Cart comparison.
 * Compares carts by total and ticket count to prevent unnecessary updates.
 */
export const cartEquality = (a: Cart, b: Cart): boolean => {
  if (a.total !== b.total) return false;
  if (a.tickets.length !== b.tickets.length) return false;
  return a.tickets.every(
    (ticket, index) =>
      ticket.event.id === b.tickets[index].event.id &&
      ticket.type.id === b.tickets[index].type.id &&
      ticket.amount === b.tickets[index].amount,
  );
};
