import { ProductModel } from "./product";

export class ProductSupplierModel {
   
   id?: string;
   name!: string;
   products!: ProductModel[];
      
   constructor(id: string, name: string){
      this.id = id;
      this.name = name;
      this.products = [];
   }
}