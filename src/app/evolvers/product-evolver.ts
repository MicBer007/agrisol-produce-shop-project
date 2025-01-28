import { ProductDto } from "../dto/product-dto";
import { ProductModel } from "../models/product";
import { OrderProductEvolver } from "./order-product-evolver";
import { ProductSupplierEvolver } from "./product-supplier-evolver";

export class ProductEvolver {

   static toModel(dto: ProductDto): ProductModel {
      var mappings: Map<Object, Object> = new Map<Object, Object>();
      return this.toModelSmart(dto, mappings)
   }

   static toDto(model: ProductModel): ProductDto {
      var mappings: Map<Object, Object> = new Map<Object, Object>();
      return this.toDtoSmart(model, mappings);
   }

   static toModelSmart(dto: ProductDto, preMappings: Map<Object, Object>): ProductModel {
      if(preMappings.has(dto)) return preMappings.get(dto) as ProductModel;

      var model: ProductModel = new ProductModel(dto.productId ? dto.productId : "", dto.name, dto.price, dto.inStock, 1, "assets/" + dto.pictureName, [], []);
      preMappings.set(dto, model);

      model.suppliers = dto.suppliers.map(s => ProductSupplierEvolver.toModelSmart(s, preMappings));
      model.orderProducts =  dto.orderProducts.map(oP => OrderProductEvolver.toModelSmart(oP, preMappings));
      
      return model;
   }

   static toDtoSmart(model: ProductModel, preMappings: Map<Object, Object>): ProductDto {
      if(preMappings.has(model)) return preMappings.get(model) as ProductDto;

      var dtoPictureName = model.picturePath.split("/")[1];
      var dto: ProductDto = {
         name: model.name,
         price: model.price,
         inStock: model.inStock,
         pictureName: dtoPictureName,
         suppliers: [],
         orderProducts: []
      }
      dto.productId = (model.id == "" ? undefined: model.id);
      preMappings.set(model, dto);

      dto.suppliers = model.suppliers.map(supplier => ProductSupplierEvolver.toDtoSmart(supplier, preMappings));
      dto.orderProducts = model.orderProducts.map(orderProductModel => OrderProductEvolver.toDtoSmart(orderProductModel, preMappings));
      return dto;
   }

}