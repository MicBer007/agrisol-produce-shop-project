import { OrderWithoutOrderProductsDto } from "./order-without-order-products-dto";
import { ProductWithoutOrderProductsDto } from "./product-without-order-products-dto";

export class OrderProductDto {
   product!: ProductWithoutOrderProductsDto;
   order!: OrderWithoutOrderProductsDto;
   quantity!: number;
}