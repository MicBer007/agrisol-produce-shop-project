import { OrderProductDto } from "./order-product-dto";

export class OrderDto {
   orderId?: string;
   orderStatus!: string;
   timeCancelled?: Date;
   timePayed?: Date;
   timeDelivered?: Date;
   customerId!: string;
   orderProducts!: OrderProductDto[];
}