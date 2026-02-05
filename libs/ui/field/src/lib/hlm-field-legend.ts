import { Directive, input } from '@angular/core';
import { classes } from '@spartan-ng/helm/utils';

@Directive({
  selector: 'legend[hlmFieldLegend]',
  host: {
    'data-slot': 'field-legend',
    '[attr.data-variant]': 'variant()',
  },
})
export class HlmFieldLegend {
  constructor() {
    classes(() => 'mb-6 font-bold data-[variant=label]:text-sm data-[variant=legend]:text-lg');
  }

  public readonly variant = input<'label' | 'legend'>('legend');
}
