import { Component } from '@angular/core';
import { ProductService } from '../../services/product-service/product.service';
import { ProductModel } from '../../models/product';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-add-product',
  imports: [FormsModule],
  templateUrl: './add-product.component.html',
  styleUrl: './add-product.component.css'
})
export class AddProductComponent {

  name: string = "null";
  price: number = -1;
  stockAmount: number = -1;
  pictureName: string = "null";

  public constructor(private productService: ProductService) { }

  onAddProductClicked(){
    // if(this.name == "null" || this.price == -1 || this.stockAmount == -1 || this.pictureName == "null") return;
    var picturePath = "assets/" + this.pictureName;
    var productModel = new ProductModel(this.name, this.price, "", this.stockAmount, 1, picturePath);
    this.productService.add$(productModel).subscribe(payload => console.log(payload));
  }

}
