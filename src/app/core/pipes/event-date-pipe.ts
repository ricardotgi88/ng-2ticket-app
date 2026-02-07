import { DatePipe } from '@angular/common';
import { Inject, LOCALE_ID, Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'eventDate',
})
export class EventDatePipe implements PipeTransform {
  readonly #datePipe: DatePipe;

  constructor(@Inject(LOCALE_ID) localeId: string) {
    this.#datePipe = new DatePipe(localeId);
  }

  transform(
    value: Date | string | number | null | undefined,
    format: 'short' | 'long' = 'long',
  ): string {
    if (value == null) return '';

    if (format === 'short') {
      const day = this.#datePipe.transform(value, `d 'de' `) ?? '';
      const monthAndTime = this.#datePipe.transform(value, `MMMM '-' HH'h'mm`) ?? '';
      return `${day} ${this.#capitalizeWords(monthAndTime)}`.trim();
    }

    const datePart = this.#datePipe.transform(value, 'EEEE, d MMM') ?? '';
    const timePart = this.#datePipe.transform(value, "'às' HH:mm") ?? '';
    return `${this.#capitalizeWords(datePart)} ${timePart}`.trim();
  }

  #capitalizeWords(value: string): string {
    return value.replace(/\b(\p{L})/gu, (char) => char.toUpperCase());
  }
}
