import { OrderStatus } from "./order-status";

export class OrderWithoutOrderProductModel {
   id?: string;
   customerId!: string;
   status: OrderStatus;
   timeCarted?: Date;
   timePayed?: Date;
   timeDelivered?: Date;

   constructor(id: string | undefined, customerId: string, status: OrderStatus, dateCarted: Date | undefined, datePayed: Date | undefined, dateDelivered: Date | undefined){
      this.id = id;
      this.customerId = customerId;
      this.status = status;
      this.timeCarted = dateCarted
      this.timePayed = datePayed;
      this.timeDelivered = dateDelivered;
   }

}