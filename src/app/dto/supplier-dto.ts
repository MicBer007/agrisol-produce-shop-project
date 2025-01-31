import { ProductSupplierJoinDto } from "./product-supplier-join-dto";

export class SupplierDto {

   supplierId?: string;
   supplierName!: string;
   productSupplierJoins!: ProductSupplierJoinDto[];
   
}