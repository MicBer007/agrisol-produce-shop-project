import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { ProductModel } from '../../models/product';
import { ProductService } from '../../services/product-service/product.service';
import { FormsModule } from '@angular/forms';
import { ProductDto } from '../../dto/product-dto';

@Component({
  selector: 'app-edit-product',
  imports: [CommonModule, FormsModule],
  templateUrl: './edit-product.component.html',
  styleUrl: './edit-product.component.css'
})
export class EditProductComponent {

  name: string = "";
  price: string = "";
  stockAmount: string = "";
  pictureName: string = "";
  
  products: ProductModel[] = [];

  constructor(private productService: ProductService){
    this.productService.getAll$().subscribe(payload => {
      this.products = payload;
      console.log(payload);
    });
  }

  onAddProductClicked(){
    let price: number = Number(this.price);
    let stockAmount: number = Number(this.stockAmount);

    if(this.name == "") {
      console.log("You must supply a name for the product!");
      return;
    }
    if(this.price == "" || Number.isNaN(price) || Number.isNaN(stockAmount)){
      console.log("Price needs a integer value!");
      return;
    };
    if(this.stockAmount == "" || stockAmount < 0){
      console.log("Stock amount has an incorrect value!");
      return;
    }

    var picturePath = "assets/" + this.pictureName;
    var productModel = new ProductModel("", this.name, parseInt(this.price), parseInt(this.stockAmount), 1, picturePath);
    this.productService.add$(productModel).subscribe(payload => {
      console.log(payload)
      this.products.push(new ProductModel(payload.toString(), this.name, parseInt(this.price), parseInt(this.stockAmount), 1, picturePath));
    });
  }



  onDeleteProductClicked(product: ProductModel){
    this.productService.delete$(product.id).subscribe(payload => {
      console.log(payload);
      if(payload as boolean){
        this.products.splice(this.products.findIndex(p => p == product), 1);
      }
    });
  }

  onEditProductClicked(product: ProductModel){
    this.productService.put$(product).subscribe(payload => {
      console.log(payload);
      if(payload as boolean){
        //update products if needed
      }
    });
  }

}
