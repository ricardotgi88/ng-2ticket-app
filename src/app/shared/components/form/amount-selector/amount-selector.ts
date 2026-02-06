import { Component, forwardRef, Input } from '@angular/core';
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';
import { NgIcon, provideIcons } from '@ng-icons/core';
import { lucideMinus, lucidePlus } from '@ng-icons/lucide';
import { HlmButtonImports } from '@spartan-ng/helm/button';

@Component({
  selector: 'app-amount-selector',
  imports: [HlmButtonImports, NgIcon],
  providers: [
    provideIcons({ lucideMinus, lucidePlus }),
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => AmountSelector),
      multi: true,
    },
  ],
  templateUrl: './amount-selector.html',
  styleUrl: './amount-selector.css',
})
export class AmountSelector implements ControlValueAccessor {
  @Input() maxSelection = -1;
  @Input() minSelection = 0;

  selected = 0;
  isDisabled = false;

  private onChange: (value: number) => void = () => {};
  private onTouched: () => void = () => {};

  writeValue(value: number | null): void {
    this.selected = value ?? 0;
  }

  registerOnChange(fn: (value: number) => void): void {
    this.onChange = fn;
  }

  registerOnTouched(fn: () => void): void {
    this.onTouched = fn;
  }

  setDisabledState(isDisabled: boolean): void {
    this.isDisabled = isDisabled;
  }

  onAdd(): void {
    if (this.isDisabled) return;
    const next = this.selected + 1;
    if (this.maxSelection > 0 && next > this.maxSelection) return;
    this.selected = next;
    this.onChange(this.selected);
    this.onTouched();
  }

  onRemove(): void {
    if (this.isDisabled) return;
    const next = this.selected - 1;
    if (next < this.minSelection) return;
    this.selected = next;
    this.onChange(this.selected);
    this.onTouched();
  }
}
