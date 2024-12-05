import { Component, inject, OnInit } from '@angular/core';
import { ProductService } from '../../services/product-service/product.service';
import { CommonModule } from '@angular/common';
import { ProductModel } from '../../models/product';
import { CartService } from '../../services/cart-service/cart.service';

@Component({
  selector: 'app-cart',
  imports: [CommonModule],
  templateUrl: './cart.component.html',
  styleUrl: './cart.component.css'
})
export class CartComponent implements OnInit {

  cartItems: ProductModel[] = []

  constructor(private productService: ProductService, private cartService: CartService) { }

  ngOnInit(): void {
    this.cartService.cart$.subscribe(payload => this.cartItems = payload);
  }

  buyCart(){
    this.cartService.clearCart()
    this.cartItems = []
  }

  clearCart(){
    this.cartService.clearCart()
    this.cartItems.forEach(cartItem => {
      this.productService.addProduct(cartItem)
    })
    this.cartItems = []
  }

}
