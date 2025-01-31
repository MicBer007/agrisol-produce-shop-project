import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { ProductModel } from '../../models/product';
import { FormsModule } from '@angular/forms';
import { ProductService } from '../../services/product-service/product-service.service';


@Component({
  selector: 'app-products',
  imports: [CommonModule, FormsModule],
  templateUrl: './products.component.html',
  styleUrl: './products.component.css'
})
export class ProductsComponent implements OnInit {

  products: ProductModel[] = [];

  productToDetail?: ProductModel = undefined;
  productBuyAmount: number = 0;

  constructor(private productService: ProductService){ }
  
  ngOnInit(): void {
    this.productService.getAll$().subscribe(payload => {
      this.products = payload;
    });
  }

  onDetailProductClicked(product: ProductModel) {
    this.productToDetail = undefined; //because we are doing an API call, we don't want the result of the prvious query to show
    
    this.productService.getProductWithSuppliers$(product.id).subscribe(payload => {
      this.productToDetail = payload;
      this.productBuyAmount = 0;
    });
  }

  onBuyDetailedProductClicked(){

  }

}