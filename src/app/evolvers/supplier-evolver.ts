import { SupplierDto } from "../dto/supplier-dto";
import { SupplierModel } from "../models/supplier";
import { ProductSupplierJoinEvolver } from "./product-supplier-join-evolver";

export class SupplierEvolver {

   static toModel(dto: SupplierDto): SupplierModel {
      var model: SupplierModel = new SupplierModel(dto.productSupplierId ? dto.productSupplierId : "", dto.productSupplierName, dto.productSupplierJoins.map(pS => ProductSupplierJoinEvolver.toModel(pS)));
      return model;
   }

   static toDto(model: SupplierModel): SupplierDto {
      var dto: SupplierDto = {
         productSupplierName: model.name,
         productSupplierJoins: model.productsSupplierJoins.map(pS => ProductSupplierJoinEvolver.toDto(pS))
      }
      dto.productSupplierId = (model.id == "" ? undefined: model.id);
      return dto;
   }

}