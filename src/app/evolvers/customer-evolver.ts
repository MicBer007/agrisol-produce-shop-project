import { CustomerDto } from "../dto/customer-dto";
import { CustomerModel } from "../models/customer";
import { OrderEvolver } from "./order-evolver";

export class CustomerEvolver {

   static toModel(dto: CustomerDto): CustomerModel {
      return new CustomerModel(dto.customerId ? dto.customerId: "", dto.firstName, 
         dto.lastName, dto.age, dto.bankDetails, dto.orders.map(OrderEvolver.toModel));
   }

   static toDto(model: CustomerModel): CustomerDto {
      var dto: CustomerDto = {
         firstName: model.firstName,
         lastName: model.lastName,
         age: model.age,
         bankDetails: model.bankDetails,
         orders: model.orders.map(OrderEvolver.toDto)
      }
      dto.customerId = (model.id == "" ? undefined: model.id);
      return dto;
   }

}