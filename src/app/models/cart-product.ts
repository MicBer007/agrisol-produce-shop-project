import { CartModel } from "./cart";
import { ProductModel } from "./product";

export class CartProductModel{
   quantity!: number;
   product?: ProductModel;
   cart?: CartModel;

   constructor(quantity: number, product?: ProductModel, cart?: CartModel){
      this.quantity = quantity;
      this.product = product;
      this.cart = cart;
   }

}