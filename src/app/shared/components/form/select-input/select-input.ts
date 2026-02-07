import { Component, forwardRef, Input } from '@angular/core';
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';
import { BrnSelectImports } from '@spartan-ng/brain/select';
import { HlmSelectImports } from '@spartan-ng/helm/select';

export type SelectOption = { value: string; name: string };

@Component({
  selector: 'app-select-input',
  imports: [BrnSelectImports, HlmSelectImports],
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => SelectInput),
      multi: true,
    },
  ],
  templateUrl: './select-input.html',
  styleUrl: './select-input.css',
})
export class SelectInput implements ControlValueAccessor {
  @Input() id = '';
  @Input() placeholder = 'Select';
  @Input() triggerId?: string | null;
  @Input() options: SelectOption[] = [];

  value: string | null = null;
  isDisabled = false;

  private onChange: (value: string | null) => void = () => {};
  private onTouched: () => void = () => {};

  writeValue(value: string | null | undefined): void {
    this.value = value ?? null;
  }

  registerOnChange(fn: (value: string | null) => void): void {
    this.onChange = fn;
  }

  registerOnTouched(fn: () => void): void {
    this.onTouched = fn;
  }

  setDisabledState(isDisabled: boolean): void {
    this.isDisabled = isDisabled;
  }

  onValueChange(value: string | (string | null)[] | null | undefined): void {
    if (this.isDisabled) return;
    const nextValue = Array.isArray(value)
      ? (value.find((item) => item != null) ?? null)
      : (value ?? null);
    this.value = nextValue;
    this.onChange(nextValue);
    this.onTouched();
  }

  onTriggerBlur(): void {
    this.onTouched();
  }
}
