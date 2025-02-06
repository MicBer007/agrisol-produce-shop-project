import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { CustomerLoginComponent } from './components/customer-login/customer-login.component';
import { NavbarComponent } from './components/navbar/navbar.component';
import { CartComponent } from './components/cart/cart.component';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, NavbarComponent, CustomerLoginComponent, CartComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})

export class AppComponent { }
