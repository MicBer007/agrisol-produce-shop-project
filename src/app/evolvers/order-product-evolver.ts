import { OrderProductDto } from "../dto/order-product-dto";
import { OrderProductModel } from "../models/order-product";
import { OrderEvolver } from "./order-evolver";
import { ProductEvolver } from "./product-evolver";

export class OrderProductEvolver{

   static toModel(dto: OrderProductDto): OrderProductModel {
      var mappings: Map<Object, Object> = new Map<Object, Object>();
      return this.toModelSmart(dto, mappings)
   }

   static toDto(model: OrderProductModel): OrderProductDto {
      var mappings: Map<Object, Object> = new Map<Object, Object>();
      return this.toDtoSmart(model, mappings);
   }
   
   static toModelSmart(dto: OrderProductDto, preMappings: Map<Object, Object>): OrderProductModel {
      if(preMappings.has(dto)) return preMappings.get(dto) as OrderProductModel;

      var model: OrderProductModel = new OrderProductModel(dto.quantity, undefined, undefined)
      preMappings.set(dto, model);

      model.product = ProductEvolver.toModelSmart(dto.product!, preMappings);
      model.order = OrderEvolver.toModelSmart(dto.order!, preMappings);
      return model;
   }

   static toDtoSmart(model: OrderProductModel, preMappings: Map<Object, Object>): OrderProductDto {
      if(preMappings.has(model)) return preMappings.get(model) as OrderProductDto;

      var dto: OrderProductDto = {
         product: undefined,
         order: undefined,
         quantity: model.quantity
      }
      preMappings.set(model, dto);

      dto.product = ProductEvolver.toDtoSmart(model.product!, preMappings);
      dto.order = OrderEvolver.toDtoSmart(model.order!, preMappings);
      return dto;
   }
   
}