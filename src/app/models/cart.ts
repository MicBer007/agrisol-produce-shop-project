import { CartProductModel } from "./cart-product";
import { CustomerModel } from "./customer";

export class CartModel{
   id: string;
   customer?: CustomerModel;
   cartProducts: CartProductModel[];
   
   constructor(id: string, cartProducts: CartProductModel[], customer?: CustomerModel){
      this.id = id;
      this.customer = customer;
      this.cartProducts = cartProducts;
   }
}