import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';

import { CheckoutBar } from './checkout-bar/checkout-bar';
import { Header } from './header/header';

@Component({
  selector: 'app-main-layout',
  imports: [RouterOutlet, Header, CheckoutBar],
  templateUrl: './main-layout.html',
  styleUrl: './main-layout.css',
})
export class MainLayout {}
