import { Component } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { HlmButtonImports } from '@spartan-ng/helm/button';
import { HlmFieldImports } from '@spartan-ng/helm/field';
import { HlmInputImports } from '@spartan-ng/helm/input';
import { HlmTextareaImports } from '@spartan-ng/helm/textarea';
import { hlm } from '@spartan-ng/helm/utils';

import { AccordionInput } from '../../shared/components/form/accordion-input/accordion-input';
import { CheckboxInput } from '../../shared/components/form/checkbox-input/checkbox-input';
import { RadioInput } from '../../shared/components/form/radio-input/radio-input';
import { SelectInput } from '../../shared/components/form/select-input/select-input';

@Component({
  selector: 'app-checkout',
  imports: [
    HlmTextareaImports,
    HlmButtonImports,
    HlmInputImports,
    HlmFieldImports,
    ReactiveFormsModule,
    AccordionInput,
    CheckboxInput,
    RadioInput,
    SelectInput,
  ],
  templateUrl: './checkout.html',
  styleUrl: './checkout.css',
})
export class Checkout {
  readonly radioCardClass = hlm(
    'relative block space-x-0',
    // base card styles
    'border-border flex items-center justify-start rounded-lg border-1 p-2 py-3',
    // hover and background styles
    'bg-background hover:bg-accent/10 cursor-pointer transition-colors',
    // target the checked state properly
    '[&:has([data-checked=true])]:border-primary [&:has([data-checked=true])]:border-1',
  );

  paymentTypes = [
    { value: 'mbWay', name: 'MbWay' },
    { value: 'creditCard', name: 'Cartão de Crédito' },
    { value: 'paypal', name: 'Paypal' },
  ];

  countryCodes = [
    { value: '+351', name: '+351' },
    { value: '+34', name: '+34' },
    { value: '+33', name: '+33' },
  ];

  public checkoutForm = new FormGroup({
    name: new FormControl('', { validators: [Validators.required], nonNullable: true }),
    countryCode: new FormControl('', { validators: [Validators.required], nonNullable: true }),
    telNumber: new FormControl('', { validators: [Validators.required], nonNullable: true }),
    email: new FormControl('', { validators: [Validators.required], nonNullable: true }),
    address: new FormControl('', { nonNullable: true }),
    addressNumber: new FormControl('', { nonNullable: true }),
    city: new FormControl('', { nonNullable: true }),
    country: new FormControl('', { nonNullable: true }),
    zipcode: new FormControl('', { nonNullable: true }),
    addressComplement: new FormControl('', { nonNullable: true }),
    vatNumber: new FormControl('', { nonNullable: true }),
    paymentType: new FormControl('', { validators: [Validators.required], nonNullable: true }),
    onlinecode: new FormControl('', { nonNullable: true }),
    hasAcceptedTaC: new FormControl(false, {
      validators: [Validators.requiredTrue],
      nonNullable: true,
    }),
    hasAcceptedNewsLetter: new FormControl(false, { nonNullable: true }),
  });
}
export const anatomyCode = `
<div hlmField>
    <label hlmFieldLabel for="field-preview-fullname">Label</label>
    <!-- Input, Select, Switch, etc. -->
    <p hlmFieldDescription>Optional helper text.</p>
    <hlm-field-error>Validation message.</hlm-field-error>
</div>
`;
export const validationAndErrorCode = `
<div hlmField data-invalid="true">
	<label hlmFieldLabel for="validation-error-email">Email</label>
	<input hlmInput id="validation-error-email" type="email" aria-invalid="true" />
	<hlm-field-error>Enter a valid email address.</hlm-field-error>
</div>
`;
