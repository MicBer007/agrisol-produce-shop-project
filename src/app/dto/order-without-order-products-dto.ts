export class OrderWithoutOrderProductsDto {
   orderId?: string;
   orderStatus!: string;
   timeCarted?: Date;
   timePayed?: Date;
   timeDelivered?: Date;
   customerId!: string;
   amounts!: number[];
}