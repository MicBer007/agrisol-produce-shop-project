export class ProductModel{
   name: string;
   price: number;
   id: string;
   inStock: number
   amount: number
   picturePath: string;

   constructor(name: string, price: number, id: string, inStock: number, amount: number, picturePath: string){
      this.name = name;
      this.price = price;
      this.id = id;
      this.inStock = inStock;
      this.amount = amount;
      this.picturePath = picturePath;
   }

}