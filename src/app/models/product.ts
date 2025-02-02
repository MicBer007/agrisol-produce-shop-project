import { OrderProductModel } from "./order-product";
import { ProductSupplierModel } from "./product-supplier";

export class ProductModel{
   name: string;
   price: number;
   id: string;
   inStock: number
   amount: number
   picturePath: string;
   suppliers: ProductSupplierModel[];
   orderProducts: OrderProductModel[];

   constructor(id: string, name: string, price: number, inStock: number, amount: number, picturePath: string, suppliers: ProductSupplierModel[], orderProducts: OrderProductModel[]){
      this.id = id;
      this.name = name;
      this.price = price;
      this.inStock = inStock;
      this.amount = amount;
      this.picturePath = picturePath;
      this.suppliers = suppliers;
      this.orderProducts = orderProducts;
   }

}