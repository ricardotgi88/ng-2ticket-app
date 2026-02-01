import { Routes } from '@angular/router';

import { hasDataGuard } from './core/guards/has-data-guard';
import { EventDetailsPreloadResolver } from './core/resolvers/event-details.resolver';
import { EventsPreloadResolver } from './core/resolvers/events.resolver';
import { MainLayout } from './shared/main-layout/main-layout';

export const routes: Routes = [
  { path: '', redirectTo: 'events', pathMatch: 'full' },
  {
    path: '',
    component: MainLayout,
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
            resolve: {
              preloadEventDetails: EventDetailsPreloadResolver,
            },
            loadComponent: () =>
              import('./views/event-details/event-details').then((m) => m.EventDetails),
          },
        ],
      },
      {
        path: 'checkout',
        canActivate: [hasDataGuard],
        loadComponent: () => import('./views/checkout/checkout').then((m) => m.Checkout),
      },
    ],
  },
  {
    path: '**',
    redirectTo: 'events',
  },
];
