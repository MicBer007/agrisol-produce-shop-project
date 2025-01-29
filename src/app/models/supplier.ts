import { ProductSupplierJoinModel } from "./product-supplier-join";

export class SupplierModel {
   
   id?: string;
   name!: string;
   productsSupplierJoins: ProductSupplierJoinModel[];
      
   constructor(id: string, name: string, productsSupplierJoins: ProductSupplierJoinModel[]){
      this.id = id;
      this.name = name;
      this.productsSupplierJoins = productsSupplierJoins;
   }
}