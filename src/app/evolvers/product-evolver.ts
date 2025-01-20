import { ProductDto } from "../dto/product-dto";
import { ProductModel } from "../models/product";
import { ProductSupplierEvolver } from "./product-supplier-evolver";

export class ProductEvolver {

   static toModel(dto: ProductDto): ProductModel {
      var suppliersModel = dto.suppliers.map(supplier => ProductSupplierEvolver.toModel(supplier));
      var model: ProductModel = {
         id: dto.productId ? dto.productId : "",
         name: dto.name,
         price: dto.price,
         inStock: dto.inStock,
         amount: 1,
         picturePath: "assets/" + dto.pictureName,
         suppliers: suppliersModel
      };
      return model;
   }

   static toDto(model: ProductModel): ProductDto {
      var dtoPictureName = model.picturePath.split("/")[1];
      var suppliersDto = model.suppliers.map(supplier => ProductSupplierEvolver.toDto(supplier));
      var dto: ProductDto = {
         name: model.name,
         price: model.price,
         inStock: model.inStock,
         pictureName: dtoPictureName,
         suppliers: suppliersDto
      };
      dto.productId = (model.id == "" ? undefined: model.id);
      return dto;
   }

}