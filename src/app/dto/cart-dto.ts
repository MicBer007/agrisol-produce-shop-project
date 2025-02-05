import { CartProductDto } from "./cart-product-dto";
import { CustomerDto } from "./customer-dto";

export class CartDto {
   cartId?: string;
   customer?: CustomerDto;
   cartProducts!: CartProductDto[];
}