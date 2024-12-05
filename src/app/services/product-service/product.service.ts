import { Injectable } from '@angular/core';
import { ProductModel } from '../../models/product';
import { ProductDto } from '../../dto/product-dto';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})

export class ProductService {

  constructor() {
    this.products = this.productsDto.map(productDto => new ProductModel(productDto.name, productDto.price, productDto.id, productDto.inStock, 1));
    this.products$.next(this.products)
  }

  protected products: ProductModel[] = [new ProductModel("Tomatoes", 10, 0, 300, 1)];
  
  products$: BehaviorSubject<ProductModel[]> = new BehaviorSubject<ProductModel[]>([]) ;

  productsDto: ProductDto[] = 
  [
    {name: "Potatoes", price: 10, id: 0, inStock: 300},
    {name: "Maize heads", price: 15, id: 1, inStock: 100},
    {name: "Carrots", price: 7, id: 2, inStock: 200},
    {name: "Cabbages", price: 30, id: 3, inStock: 70}
  ];

  getProducts(){
    return this.products
  }

  addProduct(product: ProductModel){
    var hasFoundMatch = false
    var shopItems = this.products$.value
    shopItems.forEach(shopItem => {
      if(shopItem.name === product.name && !hasFoundMatch){
        shopItem.inStock += product.amount
        hasFoundMatch = true
      }
    })
    if(!hasFoundMatch){ //should never happen
      console.log("Customer returned product that never existed!")
      shopItems.push(new ProductModel(product.name, product.price, product.id, product.inStock, 0))
    }
    this.products$.next(shopItems)
  }

  removeProduct(product: ProductModel){
    if(product.inStock < product.amount) return;
    product.inStock -= product.amount
  }

}
