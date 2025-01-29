import { ProductSupplierJoinDto } from "../dto/product-supplier-join-dto";
import { ProductModel } from "../models/product";
import { ProductSupplierJoinModel } from "../models/product-supplier-join";
import { SupplierModel } from "../models/supplier";
import { ProductEvolver } from "./product-evolver";
import { SupplierEvolver } from "./supplier-evolver";

export class ProductSupplierJoinEvolver{

   static toModel(dto: ProductSupplierJoinDto): ProductSupplierJoinModel {
      var product: ProductModel | undefined = undefined;
      var supplier: SupplierModel | undefined = undefined;
      if(dto.product != null) product = ProductEvolver.toModel(dto.product);
      if(dto.supplier != null) supplier = SupplierEvolver.toModel(dto.supplier);
      var model: ProductSupplierJoinModel = new ProductSupplierJoinModel(dto.momentCreated, product, supplier);
      return model;
   }

   static toDto(model: ProductSupplierJoinModel): ProductSupplierJoinDto {
      var dto: ProductSupplierJoinDto = {
         momentCreated: model.momentCreated
      }
      if(model.product != null) dto.product = ProductEvolver.toDto(model.product);
      if(model.supplier != null) dto.supplier = SupplierEvolver.toDto(model.supplier);
      return dto;
   }
   
}