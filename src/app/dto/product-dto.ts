import { OrderProductDto } from "./order-product-dto";
import { ProductSupplierJoinDto } from "./product-supplier-join-dto";

export class ProductDto {
   productId?: string; //id needs to be able to be set by the backend
   name!: string;
   price!: number;
   inStock!: number;
   pictureName!: string;
   productSupplierJoins!: ProductSupplierJoinDto[];
   orderProducts!: OrderProductDto[];
}