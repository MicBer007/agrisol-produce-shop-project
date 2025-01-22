import { OrderDto } from "./order-dto";

export class CustomerDto {
   customerId?: string;
   firstName!: string;
   lastName!: string;
   age!: number;
   bankDetails!: string;
   orders!: OrderDto[];
}