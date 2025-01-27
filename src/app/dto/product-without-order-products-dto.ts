import { ProductSupplierDto } from "./product-supplier-dto";

export class ProductWithoutOrderProductsDto {
   productId?: string; //id needs to be able to be set by the backend
   name!: string;
   price!: number;
   inStock!: number;
   pictureName!: string;
   suppliers!: ProductSupplierDto[];
}