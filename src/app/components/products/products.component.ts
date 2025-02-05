import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { ProductModel } from '../../models/product';
import { FormsModule } from '@angular/forms';
import { ProductService } from '../../services/product-service/product-service.service';
import { CustomerService } from '../../services/customer-service/customer.service';


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

  constructor(private productService: ProductService, private customerService: CustomerService){ }
  
  ngOnInit(): void {
    this.productService.getAll$().subscribe(payload => {
      this.products = payload;
    });
  }

  onDetailProductClicked(product: ProductModel) {
    this.productToDetail = product;
    this.productBuyAmount = 0;
  }

  onAddDetailedProductToCartClicked(product: ProductModel){
    this.customerService.addProductToCartInAmount(product, this.productBuyAmount);
  }

}