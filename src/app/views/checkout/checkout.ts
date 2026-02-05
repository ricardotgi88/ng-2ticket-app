import { Component } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { NgIcon, provideIcons } from '@ng-icons/core';
import { lucideCheck, lucideCircle } from '@ng-icons/lucide';
import { BrnSelectImports } from '@spartan-ng/brain/select';
import { HlmAccordionImports } from '@spartan-ng/helm/accordion';
import { HlmButtonImports } from '@spartan-ng/helm/button';
import { HlmCardImports } from '@spartan-ng/helm/card';
import { HlmCheckboxImports } from '@spartan-ng/helm/checkbox';
import { HlmFieldImports } from '@spartan-ng/helm/field';
import { HlmIconImports } from '@spartan-ng/helm/icon';
import { HlmInputImports } from '@spartan-ng/helm/input';
import { HlmRadioGroupImports } from '@spartan-ng/helm/radio-group';
import { HlmSelectImports } from '@spartan-ng/helm/select';
import { HlmTextareaImports } from '@spartan-ng/helm/textarea';
import { hlm } from '@spartan-ng/helm/utils';

@Component({
  selector: 'app-checkout',
  imports: [
    HlmCheckboxImports,
    HlmTextareaImports,
    HlmButtonImports,
    HlmInputImports,
    HlmFieldImports,
    BrnSelectImports,
    HlmSelectImports,
    HlmAccordionImports,
    HlmCardImports,
    HlmRadioGroupImports,
    NgIcon,
    HlmIconImports,
    ReactiveFormsModule,
  ],
  providers: [provideIcons({ lucideCheck, lucideCircle })],

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
