import { CustomerDto } from "../dto/customer-dto";
import { CustomerModel } from "../models/customer";
import { OrderEvolver } from "./order-evolver";

export class CustomerEvolver {
   static toModel(customerDto: CustomerDto): CustomerModel {
      var orderModels = customerDto.orders.map(t => OrderEvolver.toModel(t));
      var model: CustomerModel = {
         id: customerDto.customerId ? customerDto.customerId: "",
         firstName: customerDto.firstName,
         lastName: customerDto.lastName,
         age: customerDto.age,
         bankDetails: customerDto.bankDetails,
         orders: orderModels
      }
      return model;
   }
   
   static toDto(customerModel: CustomerModel): CustomerDto {
      var orderDtos = customerModel.orders.map(t => OrderEvolver.toDto(t));
      var customerDto: CustomerDto = {
         firstName: customerModel.firstName,
         lastName: customerModel.lastName,
         age: customerModel.age,
         bankDetails: customerModel.bankDetails,
         orders: orderDtos
      }
      customerDto.customerId = (customerModel.id == "" ? undefined: customerModel.id);
      return customerDto;
   }
}