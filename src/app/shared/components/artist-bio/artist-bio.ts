import { Component, Input } from '@angular/core';
import { Event } from '../../../core/interfaces/event.interface';
import { DatePipe } from '@angular/common';
import { HlmIconImports } from '@spartan-ng/helm/icon';
import { NgIcon, provideIcons } from '@ng-icons/core';
import { lucideCalendar, lucideMapPin } from '@ng-icons/lucide';

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
