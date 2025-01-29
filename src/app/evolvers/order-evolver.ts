import { OrderDto } from "../dto/order-dto";
import { OrderModel } from "../models/order";
import { OrderStatus } from "../models/order-status";
import { OrderProductEvolver } from "./order-product-evolver";

export class OrderEvolver{

   static toModel(dto: OrderDto): OrderModel {
      var orderStatusAsEnum = OrderStatus[dto.orderStatus as keyof typeof OrderStatus];
      var model: OrderModel = new OrderModel(dto.orderId, dto.customerId, orderStatusAsEnum, dto.timeCarted, dto.timePayed, dto.timeDelivered, dto.orderProducts.map(OrderProductEvolver.toModel));
      return model;
   }

   static toDto(model: OrderModel): OrderDto {
      var orderStatusAsString = model.status.toString();
      var dto: OrderDto = {
         orderStatus: orderStatusAsString,
         timeCarted: model.timeCarted,
         timePayed: model.timePayed,
         timeDelivered: model.timeDelivered,
         customerId: model.customerId,
         orderProducts: model.orderProducts.map(OrderProductEvolver.toDto)
      }
      dto.orderId = (model.id == "" ? undefined : model.id);
      return dto;
   }
   
}