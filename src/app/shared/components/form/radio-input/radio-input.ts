import { Component, forwardRef, Input } from '@angular/core';
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';
import { NgIcon, provideIcons } from '@ng-icons/core';
import { lucideCheck } from '@ng-icons/lucide';
import { HlmFieldImports } from '@spartan-ng/helm/field';
import { HlmIconImports } from '@spartan-ng/helm/icon';
import { HlmRadioGroupImports } from '@spartan-ng/helm/radio-group';
import { hlm } from '@spartan-ng/helm/utils';

export type RadioOption = { value: string; name: string };

@Component({
  selector: 'app-radio-input',
  imports: [HlmRadioGroupImports, HlmFieldImports, HlmIconImports, NgIcon],
  providers: [
    provideIcons({ lucideCheck }),
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => RadioInput),
      multi: true,
    },
  ],
  templateUrl: './radio-input.html',
  styleUrl: './radio-input.css',
})
export class RadioInput implements ControlValueAccessor {
  @Input() options: RadioOption[] = [];
  @Input() name: string = '';
  @Input() itemClass = '';

  value: string | null | undefined = null;
  isDisabled = false;

  private onChange: (value: string | null | undefined) => void = () => {};
  private onTouched: () => void = () => {};

  readonly radioCardClass = hlm(
    'relative block space-x-0',
    'border-border flex items-center justify-start rounded-lg border-1 p-2 py-3',
    'bg-background hover:bg-accent/10 cursor-pointer transition-colors',
    '[&:has([data-checked=true])]:border-primary [&:has([data-checked=true])]:border-1',
  );

  writeValue(value: string | null): void {
    this.value = value;
  }

  registerOnChange(fn: (value: string | null | undefined) => void): void {
    this.onChange = fn;
  }

  registerOnTouched(fn: () => void): void {
    this.onTouched = fn;
  }

  setDisabledState(isDisabled: boolean): void {
    this.isDisabled = isDisabled;
  }

  onValueChange(value: string | null | undefined): void {
    if (this.isDisabled) return;
    this.value = value;
    this.onChange(value);
    this.onTouched();
  }
}
