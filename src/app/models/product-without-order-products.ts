import { ProductSupplierModel } from "./product-supplier";

export class ProductWithoutOrderProductsModel{
   name: string;
   price: number;
   id: string;
   inStock: number
   amount: number
   picturePath: string;
   suppliers: ProductSupplierModel[];

   constructor(id: string, name: string, price: number, inStock: number, amount: number, picturePath: string, suppliers: ProductSupplierModel[]){
      this.id = id;
      this.name = name;
      this.price = price;
      this.inStock = inStock;
      this.amount = amount;
      this.picturePath = picturePath;
      this.suppliers = suppliers;
   }

}