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
}


