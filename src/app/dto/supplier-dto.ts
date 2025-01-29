import { ProductSupplierJoinDto } from "./product-supplier-join-dto";

export class SupplierDto {

   productSupplierId?: string;
   productSupplierName!: string;
   productSupplierJoins!: ProductSupplierJoinDto[];
   
}