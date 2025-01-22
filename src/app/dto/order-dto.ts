import { ProductDto } from "./product-dto";

export class OrderDto {
   orderId?: string;
   orderStatus!: string;
   timeCarted?: Date;
   timePayed?: Date;
   timeDelivered?: Date;
   customerId!: string;
   amounts!: number[];
   products!: ProductDto[];
}