import { ProductDto } from "./product-dto";
import { SupplierDto } from "./supplier-dto";

export class ProductSupplierJoinDto {

   product?: ProductDto;
   supplier?: SupplierDto;
   momentCreated!: Date;
   
}