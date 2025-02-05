import { CartDto } from "./cart-dto";
import { ProductDto } from "./product-dto";

export class CartProductDto{
   quantity!: number;
   product?: ProductDto;
   cart?: CartDto;
}