import { TransactionModel } from "./transaction";

export class CustomerModel {
   id: string;
   firstName: string;
   lastName: string;
   age: number;
   bankDetails: string;
   transactions: TransactionModel[];

   constructor(id: string, firstName: string, lastName: string, age: number, bankDetails: string, transactions: TransactionModel[]){
      this.id = id;
      this.firstName = firstName;
      this.lastName = lastName;
      this.age = age;
      this.bankDetails = bankDetails;
      this.transactions = transactions;
   }
}