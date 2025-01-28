import { ProductSupplierDto } from "../dto/product-supplier-dto";
import { ProductSupplierModel } from "../models/product-supplier";
import { ProductEvolver } from "./product-evolver";

export class ProductSupplierEvolver {

   static toModel(dto: ProductSupplierDto): ProductSupplierModel {
      var mappings: Map<Object, Object> = new Map<Object, Object>();
      return this.toModelSmart(dto, mappings)
   }

   static toDto(model: ProductSupplierModel): ProductSupplierDto {
      var mappings: Map<Object, Object> = new Map<Object, Object>();
      return this.toDtoSmart(model, mappings);
   }

   static toModelSmart(dto: ProductSupplierDto, preMappings: Map<Object, Object>): ProductSupplierModel {
      if(preMappings.has(dto)) return preMappings.get(dto) as ProductSupplierModel;

      var model: ProductSupplierModel = new ProductSupplierModel(dto.productSupplierId ? dto.productSupplierId : "", dto.productSupplierName, []);
      preMappings.set(dto, model);

      model.products = dto.products.map(p => ProductEvolver.toModelSmart(p, preMappings));
      return model;
   }

   static toDtoSmart(model: ProductSupplierModel, preMappings: Map<Object, Object>): ProductSupplierDto {
      if(preMappings.has(model)) return preMappings.get(model) as ProductSupplierDto;

      var dto: ProductSupplierDto = {
         productSupplierName: model.name,
         products: []
      }
      dto.productSupplierId = (model.id == "" ? undefined: model.id);
      preMappings.set(model, dto);

      dto.products = model.products.map(p => ProductEvolver.toDtoSmart(p, preMappings));
      return dto;
   }

}