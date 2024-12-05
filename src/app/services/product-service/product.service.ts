import { Injectable } from '@angular/core';
import { Product } from '../../models/product';

@Injectable({
  providedIn: 'root'
})

export class ProductService {

  protected shopItems: Product[] = [];

  generateProducts() {
    console.log("Generating products.")
    this.shopItems.push(new Product("Potatoes", 10, 0, 300, 1))
    this.shopItems.push(new Product("Maize heads", 15, 1, 100, 1))
    this.shopItems.push(new Product("Carrots", 7, 2, 200, 1))
    this.shopItems.push(new Product("Cabbages", 30, 3, 70, 1))
  }

  getProducts(): Product[] {
    return this.shopItems
  }

  getProduct(id: number): Product | undefined {
    var returnProduct = undefined
    this.shopItems.forEach(product => {
      if(product.id === id) {
        returnProduct = product
      }
    })
    return returnProduct
  }

  productReturned(product: Product){
    console.log("Customer returned product with name: " + product.name)
    var hasFoundMatch = false
    this.shopItems.forEach(shopItem => {
      if(shopItem.name === product.name && !hasFoundMatch){
        shopItem.inStock += product.amount
        hasFoundMatch = true
      }
    })
    if(!hasFoundMatch){ //should never happen
      console.log("Customer returned product that never existed!")
      this.shopItems.push(new Product(product.name, product.amount, product.id, product.amount, 0))
    }
  }

  productSold(product: Product, amount: number){
    if(product.inStock < amount) return;
    product.inStock -= amount
  }

  constructor() {
    this.generateProducts();
  }

}
