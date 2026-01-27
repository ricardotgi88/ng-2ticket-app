import { DatePipe } from '@angular/common';
import { Component, Input } from '@angular/core';
import { NgIcon, provideIcons } from '@ng-icons/core';
import { lucideCalendar, lucideMapPin } from '@ng-icons/lucide';
import { HlmIconImports } from '@spartan-ng/helm/icon';

import { Event } from '../../../core/interfaces/event.interface';

@Component({
  selector: 'app-artist-bio',
  imports: [DatePipe, NgIcon, HlmIconImports],
  providers: [provideIcons({ lucideCalendar, lucideMapPin })],
  templateUrl: './artist-bio.html',
  styleUrl: './artist-bio.css',
})
export class ArtistBio {
  @Input() event: Event = {} as Event;
}
