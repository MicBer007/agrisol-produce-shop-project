import { OrderDto } from "../dto/order-dto";
import { OrderModel } from "../models/order";
import { OrderStatus } from "../models/order-status";
import { OrderProductEvolver } from "./order-product-evolver";

export class OrderEvolver{

   static toModel(dto: OrderDto): OrderModel {
      var mappings: Map<Object, Object> = new Map<Object, Object>();
      return this.toModelSmart(dto, mappings)
   }

   static toDto(model: OrderModel): OrderDto {
      var mappings: Map<Object, Object> = new Map<Object, Object>();
      return this.toDtoSmart(model, mappings);
   }

   static toModelSmart(dto: OrderDto, preMappings: Map<Object, Object>): OrderModel {
      if(preMappings.has(dto)) return preMappings.get(dto) as OrderModel;

      var orderStatusAsEnum = OrderStatus[dto.orderStatus as keyof typeof OrderStatus];
      var model: OrderModel = new OrderModel(dto.orderId, dto.customerId, orderStatusAsEnum, dto.timeCarted, dto.timePayed, dto.timeDelivered, []);
      preMappings.set(dto, model);

      model.orderProducts = dto.orderProducts.map(oP => OrderProductEvolver.toModelSmart(oP, preMappings));
      return model;
   }
   
   static toDtoSmart(model: OrderModel, preMappings: Map<Object, Object>): OrderDto {
      if(preMappings.has(model)) return preMappings.get(model) as OrderDto;

      var orderStatusAsString = model.status.toString();
      var dto: OrderDto = {
         orderStatus: orderStatusAsString,
         timeCarted: model.timeCarted,
         timePayed: model.timePayed,
         timeDelivered: model.timeDelivered,
         customerId: model.customerId,
         orderProducts: []
      }
      dto.orderId = (model.id == "" ? undefined: model.id);
      preMappings.set(model, dto);

      dto.orderProducts = model.orderProducts.map(oP => OrderProductEvolver.toDtoSmart(oP, preMappings));
      return dto;
   }
   
}