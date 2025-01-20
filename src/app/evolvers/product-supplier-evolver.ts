import { ProductSupplierDto } from "../dto/product-supplier-dto";
import { ProductSupplierModel } from "../models/product-supplier";
import { ProductEvolver } from "./product-evolver";

export class ProductSupplierEvolver {

   static toModel(dto: ProductSupplierDto): ProductSupplierModel {
      var productsModel = dto.products.map(p => ProductEvolver.toModel(p));
      var model: ProductSupplierModel = {
         id: dto.productSupplierId ? dto.productSupplierId : "",
         name: dto.productSupplierName,
         products: productsModel
      };
      return model;
   }

   static toDto(model: ProductSupplierModel): ProductSupplierDto {
      var productsDto = model.products.map(p => ProductEvolver.toDto(p));
      var dto: ProductSupplierDto = {
         productSupplierName: model.name,
         products: productsDto
      };
      dto.productSupplierId = (model.id == "" ? undefined: model.id);
      return dto;
   }

}