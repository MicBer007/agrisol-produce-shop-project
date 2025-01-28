import { OrderModel } from "./order";
import { ProductModel } from "./product";
export class OrderProductModel {
   product?: ProductModel;
   order?: OrderModel;
   quantity: number;

   constructor(quantity: number, product?: ProductModel, order?: OrderModel){
      this.product = product;
      this.order = order;
      this.quantity = quantity;
   }

}