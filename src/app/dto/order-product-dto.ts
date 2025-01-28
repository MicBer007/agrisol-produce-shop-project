import { OrderDto } from "./order-dto";
import { ProductDto } from "./product-dto";

export class OrderProductDto {
   product?: ProductDto;
   order?: OrderDto;
   quantity!: number;
}