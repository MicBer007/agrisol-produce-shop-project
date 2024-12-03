import { Injectable } from '@angular/core';
import { Product } from '../../components/products/product';

@Injectable({
  providedIn: 'root'
})

export class ProductService {

  protected products: Product[] = [
    {name: "Potatoes", amount: 300, price: 10},
    {name: "Maize heads", amount: 200, price: 15},
    {name: "Carrots", amount: 100, price: 7},
    {name: "Cabbages", amount: 70, price: 30}
  ];

  protected cart: Product[] = [];

  getProducts(): Product[] {
    return this.products
  }

  getProduct(name: String): Product | undefined {
    return this.products.find(product => product.name === name)
  }
  
  getCart(){
    return this.cart;
  }

  buyCart(){
    this.cart = []
  }

  clearCart(){
    this.cart.forEach(cartItem => this.productReturned(cartItem))
    this.cart = []
  }

  productReturned(cartItem: Product){ //TODO the items are not really removed from the cart
    var hasFoundMatch = false
    this.products.forEach(product => {
      if(product.name === cartItem.name){
        product.amount += cartItem.amount
        hasFoundMatch = true
      }
    })
    if(!hasFoundMatch){ //should never happen
      console.log("Customer returned product that never existed!")
      this.products.push(cartItem)
    }
  }

  productSold(product: Product, amount: number){
    if(product.amount >= amount){
      product.amount -= amount
      var hasFoundMatch = false
      this.cart.forEach(cartItem => {
        if(cartItem.name === product.name){
          cartItem.amount += amount
          hasFoundMatch = true
        }
      })
      if(!hasFoundMatch){
        var newItem: Product = {name: product.name, amount: amount, price:product.price}
        this.cart.push(newItem)
      }
    }
  }

  constructor() { }
}
