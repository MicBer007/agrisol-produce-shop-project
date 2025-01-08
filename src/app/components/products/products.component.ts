import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { ProductService } from '../../services/product-service/product.service';
import { ProductModel } from '../../models/product';
import { FormsModule } from '@angular/forms';
import { CartService } from '../../services/cart-service/cart.service';
import { HttpClientModule } from '@angular/common/http';


@Component({
  selector: 'app-products',
  imports: [CommonModule, FormsModule, HttpClientModule],
  templateUrl: './products.component.html',
  styleUrl: './products.component.css'
})
export class ProductsComponent implements OnInit {

  products: ProductModel[] = [];

  constructor(private productService: ProductService, private cartService: CartService){ }
  
  ngOnInit(): void {
    this.productService.getAll$().subscribe(payload => {
      this.products = payload;
    });
  }

  buyClicked(shopItem: ProductModel){
    this.cartService.addProductToCart(shopItem);
    this.productService.removeAmountOfProduct(shopItem.amount, shopItem);
    if(shopItem.amount > shopItem.inStock){
      shopItem.amount = shopItem.inStock
    }
  };

  onDeleteProductClicked(id: string){
    this.productService.delete$(id).subscribe(payload => console.log("product deleted! id: " + id + " payload: " + payload));
  }

  putProductClicked(){
    var model: ProductModel = new ProductModel("3E7F899D-867C-4698-B853-6C66C0F413FB", "maize", 15, 500, 1, "assets/maize.jpg");
    this.productService.put$(model).subscribe(payload => console.log("product updated! payload: " + payload));
  }

}


