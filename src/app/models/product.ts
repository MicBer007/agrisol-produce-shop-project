export class Product{
   name: String;
   price: number;
   id: number;
   inStock: number
   amount: number
   constructor(name: String, price: number, id: number, inStock: number, amount: number){
      this.name = name;
      this.price = price;
      this.id = id;
      this.inStock = inStock;
      this.amount = amount;
   }
}