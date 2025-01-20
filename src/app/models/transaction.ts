export class TransactionModel {
   id: string;
   name: string;
   value: number;
   customerId: string;

   constructor(id: string, name: string, value: number, customerId: string){
      this.id = id;
      this.name = name;
      this.value = value;
      this.customerId = customerId;
   }
}