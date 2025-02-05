import { CartProductModel } from "./cart-product";
import { OrderProductModel } from "./order-product";
import { ProductSupplierJoinModel } from "./product-supplier-join";

export class ProductModel{
   name: string;
   price: number;
   id: string;
   inStock: number
   amount: number
   picturePath: string;
   productSupplierJoins: ProductSupplierJoinModel[];
   orderProducts: OrderProductModel[];
   cartProducts: CartProductModel[];

   constructor(id: string, name: string, price: number, inStock: number, amount: number, picturePath: string, productSupplierJoins: ProductSupplierJoinModel[], orderProducts: OrderProductModel[], cartProducts: CartProductModel[]){
      this.id = id;
      this.name = name;
      this.price = price;
      this.inStock = inStock;
      this.amount = amount;
      this.picturePath = picturePath;
      this.productSupplierJoins = productSupplierJoins;
      this.orderProducts = orderProducts;
      this.cartProducts = cartProducts;
   }

}