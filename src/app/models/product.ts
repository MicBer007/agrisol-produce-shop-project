export class ProductModel{
   name: string;
   price: number;
   id: string;
   inStock: number
   amount: number
   picturePath: string;

   constructor(id: string, name: string, price: number, inStock: number, amount: number, picturePath: string){
      this.id = id;
      this.name = name;
      this.price = price;
      this.inStock = inStock;
      this.amount = amount;
      this.picturePath = picturePath;
   }

}