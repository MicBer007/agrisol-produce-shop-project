import { CartDto } from "../dto/cart-dto";
import { CartModel } from "../models/cart";
import { CartProductEvolver } from "./cart-product-evolver";
import { CustomerEvolver } from "./customer-evolver";

export class CartEvolver{

   static toModel(dto: CartDto): CartModel {
      return new CartModel(dto.cartId ? dto.cartId: "", dto.cartProducts.map(cP => CartProductEvolver.toModel(cP)), dto.customer? CustomerEvolver.toModel(dto.customer) : undefined);
   }

   static toDto(model: CartModel): CartDto {
      var dto: CartDto = {
         customer: model.customer? CustomerEvolver.toDto(model.customer) : undefined,
         cartProducts: model.cartProducts.map(cP => CartProductEvolver.toDto(cP))
      }
      dto.cartId = (model.id == "" ? undefined: model.id);
      return dto;
   }

}