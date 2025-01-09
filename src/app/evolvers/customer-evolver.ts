import { CustomerDto } from "../dto/customer-dto";
import { CustomerModel } from "../models/customer";

export class CustomerEvolver {
   static toModel(customerDto: CustomerDto): CustomerModel {
      var model: CustomerModel = {
         id: customerDto.id ? customerDto.id: "",
         firstName: customerDto.firstName,
         lastName: customerDto.lastName,
         age: customerDto.age,
         bankDetails: customerDto.bankDetails
      }
      return model;
   }
   
   static toDto(customerModel: CustomerModel): CustomerDto {
      var customerDto: CustomerDto = {
         id: customerModel.id ? customerModel.id: "",
         firstName: customerModel.firstName,
         lastName: customerModel.lastName,
         age: customerModel.age,
         bankDetails: customerModel.bankDetails
      }
      return customerDto;
   }
   
   static toDtoWithoutId(customerModel: CustomerModel): CustomerDto {
      var customerDto: CustomerDto = {
         firstName: customerModel.firstName,
         lastName: customerModel.lastName,
         age: customerModel.age,
         bankDetails: customerModel.bankDetails
      }
      return customerDto;
   }
}