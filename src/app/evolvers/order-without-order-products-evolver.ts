import { OrderDto } from "../dto/order-dto";
import { OrderWithoutOrderProductsDto } from "../dto/order-without-order-products-dto";
import { OrderModel } from "../models/order";
import { OrderStatus } from "../models/order-status";
import { OrderWithoutOrderProductModel } from "../models/order-without-order-products";

export class OrderWithoutOrderProductsEvolver{

   static toModel(dto: OrderWithoutOrderProductsDto): OrderWithoutOrderProductModel {
      var orderStatusAsEnum = OrderStatus[dto.orderStatus as keyof typeof OrderStatus];
      var model: OrderWithoutOrderProductModel = {
         id: dto.orderId,
         customerId: dto.customerId,
         status: orderStatusAsEnum,
         timeCarted: dto.timeCarted,
         timePayed: dto.timePayed,
         timeDelivered: dto.timeDelivered
      }
      return model;
   }

   static toDto(model: OrderWithoutOrderProductModel): OrderWithoutOrderProductsDto {
      var orderStatusAsString = model.status.toString();
      var dto: OrderWithoutOrderProductsDto = {
         orderStatus: orderStatusAsString,
         timeCarted: model.timeCarted,
         timePayed: model.timePayed,
         timeDelivered: model.timeDelivered,
         customerId: model.customerId,
         amounts: []
      }
      dto.orderId = (model.id == "" ? undefined: model.id);
      return dto;
   }
   
}