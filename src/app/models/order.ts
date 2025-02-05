import { OrderProductModel } from "./order-product";
import { OrderStatus } from "./order-status";

export class OrderModel {
   id?: string;
   customerId!: string;
   status: OrderStatus;
   timeCancelled?: Date;
   timePayed?: Date;
   timeDelivered?: Date;
   orderProducts: OrderProductModel[];

   constructor(id: string | undefined, customerId: string, status: OrderStatus, dateCarted: Date | undefined, datePayed: Date | undefined, dateDelivered: Date | undefined, orderProducts: OrderProductModel[]){
      this.id = id;
      this.customerId = customerId;
      this.status = status;
      this.timeCancelled = dateCarted
      this.timePayed = datePayed;
      this.timeDelivered = dateDelivered;
      this.orderProducts = orderProducts;
   }

}