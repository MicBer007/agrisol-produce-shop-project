import { OrderModel } from "./order";

export class CustomerModel {
   id: string;
   firstName: string;
   lastName: string;
   age: number;
   bankDetails: string;
   orders: OrderModel[];

   constructor(id: string, firstName: string, lastName: string, age: number, bankDetails: string, orders: OrderModel[]){
      this.id = id;
      this.firstName = firstName;
      this.lastName = lastName;
      this.age = age;
      this.bankDetails = bankDetails;
      this.orders = orders;
   }
}