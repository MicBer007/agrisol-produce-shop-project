import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { ProductService } from '../../services/product-service/product.service';
import { Product } from '../../models/product';
import { FormsModule } from '@angular/forms';
import { CartService } from '../../services/cart-service/cart.service';

@Component({
  selector: 'app-products',
  imports: [CommonModule, FormsModule],
  templateUrl: './products.component.html',
  styleUrl: './products.component.css'
})
export class ProductsComponent implements OnInit {

  products: Product[] = [];

  constructor(private productService: ProductService, private cartService: CartService){ }
  
  ngOnInit(): void {
    this.products = this.productService.getProducts()
  }

  productBought(shopItem: Product){
    console.log(shopItem.amount);
    this.productService.productSold(shopItem, shopItem.amount);
    this.cartService.productSold(shopItem, shopItem.amount);
  };
}
