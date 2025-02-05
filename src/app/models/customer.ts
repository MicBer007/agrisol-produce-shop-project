import { CartModel } from "./cart";
import { OrderModel } from "./order";

export class CustomerModel {
   id: string;
   cart?: CartModel;
   firstName: string;
   lastName: string;
   age: number;
   bankDetails: string;
   orders: OrderModel[];

   constructor(id: string, firstName: string, lastName: string, age: number, bankDetails: string, orders: OrderModel[], cart?: CartModel){
      this.id = id;
      this.firstName = firstName;
      this.lastName = lastName;
      this.age = age;
      this.bankDetails = bankDetails;
      this.orders = orders;
      this.cart = cart;
   }
}