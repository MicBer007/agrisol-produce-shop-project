import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { ProductService } from '../../services/product-service/product.service';
import { ProductModel } from '../../models/product';
import { FormsModule } from '@angular/forms';


@Component({
  selector: 'app-products',
  imports: [CommonModule, FormsModule],
  templateUrl: './products.component.html',
  styleUrl: './products.component.css'
})
export class ProductsComponent implements OnInit {

  products: ProductModel[] = [];

  constructor(private productService: ProductService){ }
  
  ngOnInit(): void {
    this.productService.getAll$().subscribe(payload => {
      this.products = payload;
    });
  }

  buyClicked(product: ProductModel){
    
  }

}


