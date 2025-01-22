import { OrderDto } from "../dto/order-dto";
import { OrderModel } from "../models/order";
import { OrderStatus } from "../models/order-status";
import { ProductOrderModel } from "../models/product-order";
import { ProductEvolver } from "./product-evolver";

export class OrderEvolver{

   static toModel(dto: OrderDto): OrderModel {
      var productModels = dto.products.map(p => ProductEvolver.toModel(p));
      var productOrderModels: ProductOrderModel[] = [];
      for(var i = 0; i < productModels.length; i++) {
         productOrderModels.push(new ProductOrderModel(productModels[i], dto.amounts[i]));
      }
      var orderStatusAsEnum = OrderStatus[dto.orderStatus as keyof typeof OrderStatus];
      var model: OrderModel = {
         id: dto.orderId,
         customerId: dto.customerId,
         status: orderStatusAsEnum,
         timeCarted: dto.timeCarted,
         timePayed: dto.timePayed,
         timeDelivered: dto.timeDelivered,
         orderProducts: productOrderModels
      }
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
         amounts: [],
         products: []
      }
      dto.orderId = (model.id == "" ? undefined: model.id);
      return dto;
   }
   
}