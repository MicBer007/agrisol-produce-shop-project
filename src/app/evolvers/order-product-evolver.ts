import { OrderProductDto } from "../dto/order-product-dto";
import { OrderModel } from "../models/order";
import { OrderProductModel } from "../models/order-product";
import { ProductModel } from "../models/product";
import { OrderEvolver } from "./order-evolver";
import { ProductEvolver } from "./product-evolver";

export class OrderProductEvolver{

   static toModel(dto: OrderProductDto): OrderProductModel {
      var product: ProductModel | undefined = undefined;
      var order: OrderModel | undefined = undefined;
      if(dto.product != null) product = ProductEvolver.toModel(dto.product);
      if(dto.order != null) order = OrderEvolver.toModel(dto.order);
      var model: OrderProductModel = new OrderProductModel(dto.quantity, product, order);
      return model;
   }

   static toDto(model: OrderProductModel): OrderProductDto {
      var dto: OrderProductDto = {
         quantity: model.quantity
      }
      if(model.product != null) dto.product = ProductEvolver.toDto(model.product);
      if(model.order != null) dto.order = OrderEvolver.toDto(model.order);
      return dto;
   }

}