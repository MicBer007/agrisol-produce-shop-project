import { ProductWithoutOrderProductsDto } from "../dto/product-without-order-products-dto";
import { ProductWithoutOrderProductsModel } from "../models/product-without-order-products";
import { ProductSupplierEvolver } from "./product-supplier-evolver";

export class ProductWithoutOrderProductsEvolver {

   static toModel(dto: ProductWithoutOrderProductsDto): ProductWithoutOrderProductsModel {
      var supplierModels = dto.suppliers.map(supplier => ProductSupplierEvolver.toModel(supplier));
      var model: ProductWithoutOrderProductsModel = {
         id: dto.productId ? dto.productId : "",
         name: dto.name,
         price: dto.price,
         inStock: dto.inStock,
         amount: 1,
         picturePath: "assets/" + dto.pictureName,
         suppliers: supplierModels
      };
      return model;
   }

   static toDto(model: ProductWithoutOrderProductsModel): ProductWithoutOrderProductsDto {
      var dtoPictureName = model.picturePath.split("/")[1];
      var supplierDtos = model.suppliers.map(supplier => ProductSupplierEvolver.toDto(supplier));
      var dto: ProductWithoutOrderProductsDto = {
         name: model.name,
         price: model.price,
         inStock: model.inStock,
         pictureName: dtoPictureName,
         suppliers: supplierDtos
      };
      dto.productId = (model.id == "" ? undefined: model.id);
      return dto;
   }

}