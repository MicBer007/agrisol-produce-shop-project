import { CustomerDto } from "../dto/customer-dto";
import { CustomerModel } from "../models/customer";
import { OrderEvolver } from "./order-evolver";

export class CustomerEvolver {

   static toModel(customerDto: CustomerDto): CustomerModel {
      var mappings: Map<Object, Object> = new Map<Object, Object>();
      var customer: CustomerModel = this.toModelSmart(customerDto, mappings);
      return customer;
   }
   
   static toDto(model: CustomerModel): CustomerDto {
      var mappings: Map<Object, Object> = new Map<Object, Object>();
      var customer: CustomerDto = this.toDtoSmart(model, mappings);
      return customer;
   }
   
   static toModelSmart(dto: CustomerDto, preMappings: Map<Object, Object>): CustomerModel {
      if(preMappings.has(dto)) return preMappings.get(dto) as CustomerModel;
   
      var model: CustomerModel = new CustomerModel(dto.customerId ? dto.customerId: "", dto.firstName, dto.lastName, dto.age, dto.bankDetails, []);
      preMappings.set(dto, model);

      model.orders = dto.orders.map(t => OrderEvolver.toModelSmart(t, preMappings));
      return model;
   }
   
   static toDtoSmart(model: CustomerModel, preMappings: Map<Object, Object>): CustomerDto {
      if(preMappings.has(model)) return preMappings.get(model) as CustomerDto;

      var dto: CustomerDto = {
         firstName: model.firstName,
         lastName: model.lastName,
         age: model.age,
         bankDetails: model.bankDetails,
         orders: []
      }
      dto.customerId = (model.id == "" ? undefined: model.id);
      preMappings.set(model, dto);

      dto.orders = model.orders.map(t => OrderEvolver.toDtoSmart(t, preMappings));
      return dto;
   }

}