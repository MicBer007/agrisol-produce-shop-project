import { OrderDto } from "../dto/order-dto";
import { OrderModel } from "../models/order";
import { OrderStatus } from "../models/order-status";
import { OrderProductEvolver } from "./order-product-evolver";

export class OrderEvolver{

   static toModel(dto: OrderDto): OrderModel {
      var orderProductModels = dto.orderProducts.map(oP => OrderProductEvolver.toModel(oP));
      var orderStatusAsEnum = OrderStatus[dto.orderStatus as keyof typeof OrderStatus];
      var model: OrderModel = {
         id: dto.orderId,
         customerId: dto.customerId,
         status: orderStatusAsEnum,
         timeCarted: dto.timeCarted,
         timePayed: dto.timePayed,
         timeDelivered: dto.timeDelivered,
         orderProducts: orderProductModels
      }
      return model;
   }

   static toDto(model: OrderModel): OrderDto {
      var orderStatusAsString = model.status.toString();
      var orderProductDtos = model.orderProducts.map(oP => OrderProductEvolver.toDto(oP));
      var dto: OrderDto = {
         orderStatus: orderStatusAsString,
         timeCarted: model.timeCarted,
         timePayed: model.timePayed,
         timeDelivered: model.timeDelivered,
         customerId: model.customerId,
         orderProducts: orderProductDtos
      }
      dto.orderId = (model.id == "" ? undefined: model.id);
      return dto;
   }
   
}