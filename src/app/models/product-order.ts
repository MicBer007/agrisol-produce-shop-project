import { ProductModel } from "./product";

export class ProductOrderModel {
   product!: ProductModel;
   amount!: number;
   constructor(product: ProductModel, amount: number) {
      this.product = product;
      this.amount = amount;
   }
}