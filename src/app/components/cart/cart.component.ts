import { Component, inject } from '@angular/core';
import { ProductService } from '../../services/product-service/product.service';
import { Product } from '../products/product';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-cart',
  imports: [CommonModule],
  templateUrl: './cart.component.html',
  styleUrl: './cart.component.css'
})
export class CartComponent {
  productService = inject(ProductService)
  cart: Product[] = [];

  constructor() {
    this.cart = this.productService.getCart();
  }

  buyCart(){
    this.productService.buyCart()
    this.cart = []
  }

  clearCart(){
    this.productService.clearCart()
    this.cart = []
  }

}
