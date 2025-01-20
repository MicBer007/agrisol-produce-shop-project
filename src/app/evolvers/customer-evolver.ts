import { CustomerDto } from "../dto/customer-dto";
import { CustomerModel } from "../models/customer";
import { TransactionEvolver } from "./transaction-evolver";

export class CustomerEvolver {
   static toModel(customerDto: CustomerDto): CustomerModel {
      var transactionsAsModelList = customerDto.transactions.map(t => TransactionEvolver.toModel(t));
      var model: CustomerModel = {
         id: customerDto.customerId ? customerDto.customerId: "",
         firstName: customerDto.firstName,
         lastName: customerDto.lastName,
         age: customerDto.age,
         bankDetails: customerDto.bankDetails,
         transactions: transactionsAsModelList
      }
      return model;
   }
   
   static toDto(customerModel: CustomerModel): CustomerDto {
      var transactionsAsDtoList = customerModel.transactions.map(t => TransactionEvolver.toDto(t));
      var customerDto: CustomerDto = {
         firstName: customerModel.firstName,
         lastName: customerModel.lastName,
         age: customerModel.age,
         bankDetails: customerModel.bankDetails,
         transactions: transactionsAsDtoList
      }
      customerDto.customerId = (customerModel.id == "" ? undefined: customerModel.id);
      return customerDto;
   }
}