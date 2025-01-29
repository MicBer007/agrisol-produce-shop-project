import { ProductModel } from "./product";
import { SupplierModel } from "./supplier";

export class ProductSupplierJoinModel {
   
   product?: ProductModel;
   supplier?: SupplierModel;
   momentCreated!: Date;
      
   constructor(momentCreated: Date, product?: ProductModel, supplier?: SupplierModel){
      this.product = product;
      this.supplier = supplier;
      this.momentCreated = momentCreated;
   }
   
}