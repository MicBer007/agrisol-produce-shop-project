export class CustomerModel {
   id: string;
   firstName: string;
   lastName: string;
   age: number;
   bankDetails: string;

   constructor(id: string, firstName: string, lastName: string, age: number, bankDetails: string){
      this.id = id;
      this.firstName = firstName;
      this.lastName = lastName;
      this.age = age;
      this.bankDetails = bankDetails;
   }
}