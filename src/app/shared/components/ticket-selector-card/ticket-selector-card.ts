import { Component } from '@angular/core';
import { provideIcons } from '@ng-icons/core';
import { lucideCheck, lucideChevronDown } from '@ng-icons/lucide';
import { HlmButtonImports } from '@spartan-ng/helm/button';
import { HlmCardImports } from '@spartan-ng/helm/card';
import { HlmInputImports } from '@spartan-ng/helm/input';
import { HlmLabelImports } from '@spartan-ng/helm/label';
import { HlmBadgeImports } from '@spartan-ng/helm/badge';

@Component({
  selector: 'app-ticket-selector-card',
  imports: [HlmCardImports, HlmLabelImports, HlmInputImports, HlmButtonImports, HlmBadgeImports],
  providers: [provideIcons({ lucideCheck, lucideChevronDown })],
  templateUrl: './ticket-selector-card.html',
  host: {
    class: 'contents',
  },
  styleUrl: './ticket-selector-card.css',
})
export class TicketSelectorCard {}
