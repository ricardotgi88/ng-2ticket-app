import { Component, Input } from '@angular/core';
import { NgIcon, provideIcons } from '@ng-icons/core';
import { lucideCalendar, lucideMapPin } from '@ng-icons/lucide';
import { HlmIconImports } from '@spartan-ng/helm/icon';

import { Event } from '../../../api/models/event.interface';
import { CoverImage } from '../cover-image/cover-image';
import { EventDatePipe } from '../../../core/pipes/event-date-pipe';

@Component({
  selector: 'app-artist-bio',
  imports: [NgIcon, HlmIconImports, CoverImage, EventDatePipe],
  providers: [provideIcons({ lucideCalendar, lucideMapPin })],
  templateUrl: './artist-bio.html',
  styleUrl: './artist-bio.css',
})
export class ArtistBio {
  @Input() event: Event = {} as Event;
}
