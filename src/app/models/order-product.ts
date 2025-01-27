import { OrderWithoutOrderProductModel } from "./order-without-order-products";
import { ProductWithoutOrderProductsModel } from "./product-without-order-products";

export class OrderProductModel {
   product: ProductWithoutOrderProductsModel;
   order: OrderWithoutOrderProductModel;
   quantity: number;

   constructor(product: ProductWithoutOrderProductsModel, order: OrderWithoutOrderProductModel, quantity: number){
      this.product = product;
      this.order = order;
      this.quantity = quantity;
   }

}