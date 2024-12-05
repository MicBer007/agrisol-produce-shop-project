import { Injectable } from '@angular/core';
import { Product } from '../../models/product';

@Injectable({
  providedIn: 'root'
})
export class CartService {

  protected cart: Product[] = []

  constructor() { }
  
  getCart(){
    return this.cart;
  }

  clearCart(){
    this.cart = []
  }

  productReturned(product: Product){
    this.cart.splice(this.cart.indexOf(product), 1)
  }

  productSold(shopItem: Product, amount: number){
    console.log("CartService: registered product sale.")
    if(shopItem.inStock < amount) return;
    var hasFoundMatch = false
    this.cart.forEach(cartItem => {
      if(cartItem.id === shopItem.id){
        cartItem.amount += amount
        hasFoundMatch = true
      }
    })
    if(!hasFoundMatch){
      var newItem: Product = new Product(shopItem.name, shopItem.price, shopItem.id, 0, amount)
      this.cart.push(newItem)
    }
  }

}
