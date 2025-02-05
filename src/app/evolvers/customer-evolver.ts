import { CustomerDto } from "../dto/customer-dto";
import { CartModel } from "../models/cart";
import { CustomerModel } from "../models/customer";
import { CartEvolver } from "./cart-evolver";
import { OrderEvolver } from "./order-evolver";

export class CustomerEvolver {

   static toModel(dto: CustomerDto): CustomerModel {
      var cart: CartModel | undefined = dto.cart ? CartEvolver.toModel(dto.cart) : undefined;
      return new CustomerModel(dto.customerId ? dto.customerId: "", dto.firstName, 
         dto.lastName, dto.age, dto.bankDetails, dto.orders.map(OrderEvolver.toModel), cart);
   }

   static toDto(model: CustomerModel): CustomerDto {
      var dto: CustomerDto = {
         cart: model.cart? CartEvolver.toDto(model.cart) : undefined,
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