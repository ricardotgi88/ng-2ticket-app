import { Component, forwardRef, Input } from '@angular/core';
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';
import { HlmCheckboxImports } from '@spartan-ng/helm/checkbox';
import { HlmFieldImports } from '@spartan-ng/helm/field';

@Component({
  selector: 'app-checkbox-input',
  imports: [HlmCheckboxImports, HlmFieldImports],
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => CheckboxInput),
      multi: true,
    },
  ],
  templateUrl: './checkbox-input.html',
  styleUrl: './checkbox-input.css',
})
export class CheckboxInput implements ControlValueAccessor {
  @Input() id = '';
  @Input() name: string | null = null;
  @Input() label = '';
  @Input() description = '';

  value = false;
  isDisabled = false;

  onChange: (value: boolean) => void = () => {};
  onTouched: () => void = () => {};

  writeValue(value: boolean | null): void {
    this.value = !!value;
  }

  registerOnChange(fn: (value: boolean) => void): void {
    this.onChange = fn;
  }

  registerOnTouched(fn: () => void): void {
    this.onTouched = fn;
  }

  setDisabledState(isDisabled: boolean): void {
    this.isDisabled = isDisabled;
  }

  onCheckboxChange(checked: boolean): void {
    if (this.isDisabled) return;
    this.value = checked;
    this.onChange(checked);
    this.onTouched();
  }

  onLabelClick(event: MouseEvent): void {
    if (this.isDisabled) return;
    const target = event.target as HTMLElement | null;
    if (target?.closest('hlm-checkbox, brn-checkbox, input, button')) {
      return;
    }
    const next = !this.value;
    this.value = next;
    this.onChange(next);
    this.onTouched();
  }
}
