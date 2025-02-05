import { CartDto } from "./cart-dto";
import { OrderDto } from "./order-dto";

export class CustomerDto {
   customerId?: string;
   cart?: CartDto;
   firstName!: string;
   lastName!: string;
   age!: number;
   bankDetails!: string;
   orders!: OrderDto[];
}