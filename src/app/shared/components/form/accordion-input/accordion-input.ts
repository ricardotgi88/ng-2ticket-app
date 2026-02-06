import { NgClass } from '@angular/common';
import { Component, EventEmitter, Input, Output } from '@angular/core';
import { NgIcon, provideIcons } from '@ng-icons/core';
import { lucideChevronDown } from '@ng-icons/lucide';
import { HlmAccordionImports } from '@spartan-ng/helm/accordion';
import { HlmCardImports } from '@spartan-ng/helm/card';
import { HlmIconImports } from '@spartan-ng/helm/icon';

@Component({
  selector: 'app-accordion-input',
  imports: [HlmAccordionImports, HlmCardImports, HlmIconImports, NgIcon, NgClass],
  providers: [provideIcons({ lucideChevronDown })],
  templateUrl: './accordion-input.html',
  styleUrl: './accordion-input.css',
})
export class AccordionInput {
  @Input() isOpened?: boolean;
  @Output() openedChange = new EventEmitter<boolean>();
}
