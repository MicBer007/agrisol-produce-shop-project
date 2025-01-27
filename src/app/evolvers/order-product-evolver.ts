import { OrderProductDto } from "../dto/order-product-dto";
import { OrderProductModel } from "../models/order-product";
import { OrderWithoutOrderProductsEvolver } from "./order-without-order-products-evolver";
import { ProductWithoutOrderProductsEvolver } from "./product-without-order-products-evolver";

export class OrderProductEvolver{

   static toModel(dto: OrderProductDto): OrderProductModel {
      
      var model: OrderProductModel = {
         product: ProductWithoutOrderProductsEvolver.toModel(dto.product),
         order: OrderWithoutOrderProductsEvolver.toModel(dto.order),
         quantity: dto.quantity
      }
      return model;
   }

   static toDto(model: OrderProductModel): OrderProductDto {
      var dto: OrderProductDto = {
         product: ProductWithoutOrderProductsEvolver.toDto(model.product),
         order: OrderWithoutOrderProductsEvolver.toDto(model.order),
         quantity: model.quantity
      }
      return dto;
   }
   
}