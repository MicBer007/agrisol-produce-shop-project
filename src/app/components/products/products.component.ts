import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { ProductService } from '../../services/product-service/product.service';
import { ProductModel } from '../../models/product';
import { FormsModule } from '@angular/forms';
import { CartService } from '../../services/cart-service/cart.service';

@Component({
  selector: 'app-products',
  imports: [CommonModule, FormsModule],
  templateUrl: './products.component.html',
  styleUrl: './products.component.css'
})
export class ProductsComponent implements OnInit {

  products: ProductModel[] = [];

  constructor(private productService: ProductService, private cartService: CartService){ }
  
  ngOnInit(): void {
    this.productService.products$.subscribe(payload => this.products = payload);
  }

  buyClicked(shopItem: ProductModel){
    console.log(shopItem.amount);
    this.cartService.addProductToCart(shopItem);
    this.productService.removeProduct(shopItem);
  };
}
