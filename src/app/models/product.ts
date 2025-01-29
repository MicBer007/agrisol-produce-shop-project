import { OrderProductModel } from "./order-product";
import { ProductSupplierJoinModel } from "./product-supplier-join";

export class ProductModel{
   name: string;
   price: number;
   id: string;
   inStock: number
   amount: number
   picturePath: string;
   productSupplierJoins: ProductSupplierJoinModel[];
   orderProducts: OrderProductModel[];

   constructor(id: string, name: string, price: number, inStock: number, amount: number, picturePath: string, productSupplierJoins: ProductSupplierJoinModel[], orderProducts: OrderProductModel[]){
      this.id = id;
      this.name = name;
      this.price = price;
      this.inStock = inStock;
      this.amount = amount;
      this.picturePath = picturePath;
      this.productSupplierJoins = productSupplierJoins;
      this.orderProducts = orderProducts;
   }

}