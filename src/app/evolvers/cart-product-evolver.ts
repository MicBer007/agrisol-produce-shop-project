import { CartProductDto } from "../dto/cart-product-dto";
import { CartModel } from "../models/cart";
import { CartProductModel } from "../models/cart-product";
import { ProductModel } from "../models/product";
import { CartEvolver } from "./cart-evolver";
import { ProductEvolver } from "./product-evolver";

export class CartProductEvolver{

   static toModel(dto: CartProductDto): CartProductModel {
         var product: ProductModel | undefined = undefined;
         var cart: CartModel | undefined = undefined;
         if(dto.product != null) product = ProductEvolver.toModel(dto.product);
         if(dto.cart != null) cart = CartEvolver.toModel(dto.cart);
         var model: CartProductModel = new CartProductModel(dto.quantity, product, cart);
         return model;
   }

   static toDto(model: CartProductModel): CartProductDto {
         var dto: CartProductDto = {
            quantity: model.quantity
         }
         if(model.product != null) dto.product = ProductEvolver.toDto(model.product);
         if(model.cart != null) dto.cart = CartEvolver.toDto(model.cart);
         return dto;
   }

}