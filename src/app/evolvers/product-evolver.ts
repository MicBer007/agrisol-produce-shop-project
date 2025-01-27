import { ProductDto } from "../dto/product-dto";
import { ProductModel } from "../models/product";
import { OrderProductEvolver } from "./order-product-evolver";
import { ProductSupplierEvolver } from "./product-supplier-evolver";

export class ProductEvolver {

   static toModel(dto: ProductDto): ProductModel {
      dto.suppliers.forEach(s => console.log("supplier: " + s));
      var supplierModels = dto.suppliers.map(supplier => ProductSupplierEvolver.toModel(supplier));
      var orderProductModels = dto.orderProducts.map(orderProductDto => OrderProductEvolver.toModel(orderProductDto));
      var model: ProductModel = {
         id: dto.productId ? dto.productId : "",
         name: dto.name,
         price: dto.price,
         inStock: dto.inStock,
         amount: 1,
         picturePath: "assets/" + dto.pictureName,
         suppliers: supplierModels,
         orderProducts: orderProductModels
      };
      return model;
   }

   static toDto(model: ProductModel): ProductDto {
      var dtoPictureName = model.picturePath.split("/")[1];
      var supplierDtos = model.suppliers.map(supplier => ProductSupplierEvolver.toDto(supplier));
      var orderProductDtos = model.orderProducts.map(orderProductModel => OrderProductEvolver.toDto(orderProductModel));
      var dto: ProductDto = {
         name: model.name,
         price: model.price,
         inStock: model.inStock,
         pictureName: dtoPictureName,
         suppliers: supplierDtos,
         orderProducts: orderProductDtos
      };
      dto.productId = (model.id == "" ? undefined: model.id);
      return dto;
   }

}