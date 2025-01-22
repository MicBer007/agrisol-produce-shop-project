import { OrderStatus } from "./order-status";
import { ProductOrderModel as OrderProductModel } from "./product-order";

export class OrderModel {
   id?: string;
   customerId!: string;
   status: OrderStatus;
   timeCarted?: Date;
   timePayed?: Date;
   timeDelivered?: Date;
   orderProducts: OrderProductModel[];

   constructor(id: string | undefined, customerId: string, status: OrderStatus, dateCarted: Date | undefined, datePayed: Date | undefined, dateDelivered: Date | undefined, orderProducts: OrderProductModel[]){
      this.id = id;
      this.customerId = customerId;
      this.status = status;
      this.timeCarted = dateCarted
      this.timePayed = datePayed;
      this.timeDelivered = dateDelivered;
      this.orderProducts = orderProducts;
   }

}