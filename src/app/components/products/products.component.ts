import { CommonModule } from '@angular/common';
import { Component, inject } from '@angular/core';
import { ProductService } from '../../services/product-service/product.service';
import { Product } from './product';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-products',
  imports: [CommonModule, FormsModule],
  templateUrl: './products.component.html',
  styleUrl: './products.component.css'
})
export class ProductsComponent {
  productService = inject(ProductService)
  products;
  constructor(){
    this.products = this.productService.getProducts()
  }
  productBought(product: Product, inputElement: HTMLInputElement){
    this.productService.productSold(product, Number(inputElement.value));
  };
}
