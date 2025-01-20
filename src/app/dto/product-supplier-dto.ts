import { ProductDto } from "./product-dto";

export class ProductSupplierDto {

   productSupplierId?: string;
   productSupplierName!: string;
   products!: ProductDto[];
   
}