export class ProductDto{
   id?: string; //id needs to be able to be set by the backend
   name!: string;
   price!: number;
   inStock!: number;
   pictureName!: string;
}