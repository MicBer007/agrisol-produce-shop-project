import { Component, OnInit } from '@angular/core';
import { RouterLink, RouterLinkActive, RouterOutlet } from '@angular/router';
import { CommonModule } from '@angular/common';
import { of } from 'rxjs';
import { CartService } from './services/cart-service/cart.service';

@Component({
  selector: 'app-root',
  imports: [RouterLink, RouterLinkActive, RouterOutlet, CommonModule],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})

export class AppComponent implements OnInit {
  cartLength = 0;
  constructor(private cartService: CartService){
  }
  ngOnInit(): void {
    this.cartService.cart$.subscribe(payload => this.cartLength = payload.length);
  }
}
