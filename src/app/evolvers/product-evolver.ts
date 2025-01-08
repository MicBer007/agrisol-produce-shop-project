import { ProductDto } from "../dto/product-dto";
import { ProductModel } from "../models/product";

export class ProductEvolver {

   static toModel(dto: ProductDto): ProductModel{
      var model: ProductModel = {
         id: dto.id ? dto.id : "",
         name: dto.name,
         price: dto.price,
         inStock: dto.inStock,
         amount: 1,
         picturePath: "assets/" + dto.pictureName
      };
      return model;
   }

   static toDto(model: ProductModel): ProductDto {
      var dtoPictureName = model.picturePath.split("/")[1];
      var dto: ProductDto = {
         name: model.name,
         price: model.price,
         
         inStock: model.inStock,
         pictureName: dtoPictureName
      };
      return dto;
   }

}