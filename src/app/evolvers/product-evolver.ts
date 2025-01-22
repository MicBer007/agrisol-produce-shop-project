import { ProductDto } from "../dto/product-dto";
import { ProductModel } from "../models/product";
import { OrderEvolver } from "./order-evolver";
import { ProductSupplierEvolver } from "./product-supplier-evolver";

export class ProductEvolver {

   static toModel(dto: ProductDto): ProductModel {
      var supplierModels = dto.suppliers.map(supplier => ProductSupplierEvolver.toModel(supplier));
      var orderModels = dto.orders.map(orderDto => OrderEvolver.toModel(orderDto));
      var model: ProductModel = {
         id: dto.productId ? dto.productId : "",
         name: dto.name,
         price: dto.price,
         inStock: dto.inStock,
         amount: 1,
         picturePath: "assets/" + dto.pictureName,
         suppliers: supplierModels,
         orders: orderModels
      };
      return model;
   }

   static toDto(model: ProductModel): ProductDto {
      var dtoPictureName = model.picturePath.split("/")[1];
      var supplierDtos = model.suppliers.map(supplier => ProductSupplierEvolver.toDto(supplier));
      var orderDtos = model.orders.map(orderModel => OrderEvolver.toDto(orderModel));
      var dto: ProductDto = {
         name: model.name,
         price: model.price,
         inStock: model.inStock,
         pictureName: dtoPictureName,
         suppliers: supplierDtos,
         orders: orderDtos
      };
      dto.productId = (model.id == "" ? undefined: model.id);
      return dto;
   }

}