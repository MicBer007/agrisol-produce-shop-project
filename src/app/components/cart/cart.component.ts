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

  totalAmount: number = 0;
  totalPrice: number = 0;

  constructor(private productService: ProductService, private cartService: CartService) { }

  ngOnInit(): void {
    this.cartService.cart$.subscribe(payload => this.updateCart(payload));
  }

  updateCart(newCart: ProductModel[]){
    this.cartItems = newCart;
    this.totalAmount = 0;
    this.totalPrice = 0;
    this.cartItems.forEach(cartItem => {
      this.totalAmount += cartItem.amount; 
      this.totalPrice += cartItem.amount*cartItem.price
    });
  }

  buyCart(){
    //do product transactions (payment, delivery, etc.)
    this.cartService.clearCart()
  }

  clearCart(){
    this.cartItems.forEach(cartItem => {
      this.productService.addAmountOfProduct(cartItem.amount, cartItem)
    })
    this.cartService.clearCart()
  }

}
