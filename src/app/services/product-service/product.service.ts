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

  getProducts(): Product[] {
    return this.products
  }

  getProduct(name: String): Product | undefined {
    return this.products.find(product => product.name === name)
  }

  productSold(product: Product){
    if(product.amount >= 1){
      product.amount -= 1
    }
  }

  productSoldInAmount(product: Product, amount: number){
    if(product.amount >= amount){
      product.amount -= amount
    }
  }

  constructor() { }
}
