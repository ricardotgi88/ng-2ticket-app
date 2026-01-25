import { Routes } from '@angular/router';
import { EventsPreloadResolver } from './core/resolvers/events.resolver';

export const routes: Routes = [
  { path: '', redirectTo: 'events', pathMatch: 'full' },
  {
    path: '',
    children: [
      {
        path: 'events',
        children: [
          {
            path: '',
            resolve: {
              preloadEvents: EventsPreloadResolver,
            },
            loadComponent: () => import('./views/event-list/event-list').then((m) => m.EventList),
          },
          {
            path: ':id',
            loadComponent: () =>
              import('./views/event-details/event-details').then((m) => m.EventDetails),
          },
        ],
      },
      {
        path: 'checkout',
        loadComponent: () => import('./views/checkout/checkout').then((m) => m.Checkout),
      },
    ],
  },
  {
    path: '**',
    redirectTo: 'events',
  },
];
