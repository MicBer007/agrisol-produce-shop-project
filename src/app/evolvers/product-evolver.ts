import { ProductDto } from "../dto/product-dto";
import { ProductModel } from "../models/product";
import { OrderProductEvolver } from "./order-product-evolver";
import { ProductSupplierJoinEvolver } from "./product-supplier-join-evolver";

export class ProductEvolver {

   static toModel(dto: ProductDto): ProductModel {
      var model: ProductModel = new ProductModel(dto.productId ? dto.productId : "", dto.name, dto.price, dto.inStock, 
         1, "assets/" + dto.pictureName, dto.productSupplierJoins.map(ProductSupplierJoinEvolver.toModel), 
         dto.orderProducts.map(OrderProductEvolver.toModel));
      return model;
   }

   static toDto(model: ProductModel): ProductDto {
      var dtoPictureName = model.picturePath.split("/")[1];
      var dto: ProductDto = {
         name: model.name,
         price: model.price,
         inStock: model.inStock,
         pictureName: dtoPictureName,
         productSupplierJoins: model.productSupplierJoins.map(ProductSupplierJoinEvolver.toDto),
         orderProducts: model.orderProducts.map(OrderProductEvolver.toDto)
      }
      dto.productId = (model.id == "" ? undefined: model.id);
      return dto;
   }

}