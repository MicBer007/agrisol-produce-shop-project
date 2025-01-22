import { Injectable } from '@angular/core';
import { ProductModel } from '../../models/product';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CartService {

  cart$: BehaviorSubject<ProductModel[]> = new BehaviorSubject<ProductModel[]>([])

  constructor() { }

  clearCart(){
    this.cart$.next([])
  }

  removeProductFromCart(product: ProductModel){
    var cartList = this.cart$.value;

    cartList.splice(cartList.indexOf(product), 1)

    this.cart$.next(cartList)
  }

  addProductToCart(shopItem: ProductModel){
    if(shopItem.inStock < shopItem.amount) return;
    var cartList = this.cart$.value;

    var hasFoundMatch = false
    cartList.forEach(cartItem => {
      if(cartItem.id === shopItem.id && !hasFoundMatch){
        hasFoundMatch = true
        cartItem.amount += shopItem.amount
      }
    })
    if(!hasFoundMatch){
      cartList.push(new ProductModel(shopItem.id, shopItem.name, shopItem.price, shopItem.inStock, shopItem.amount, shopItem.picturePath, [], []))
    }
    
    this.cart$.next(cartList)
  }

}
