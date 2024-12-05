import { ProductDto } from "../dto/product-dto";
import { ProductModel } from "../models/product";

export class ProductEvolver {

   static toModel(dto: ProductDto): ProductModel{
      return dto && {
         id: dto.id,
         name: dto.name,
         price: dto.price,
         inStock: dto.inStock,
         amount: 1
      }
   }

   static toDto(model: ProductModel): ProductDto {
      return model && {
         name: model.name,
         price: model.price,
         id: model.id,
         inStock: model.inStock
      }
   }

}