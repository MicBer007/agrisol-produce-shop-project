import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { ProductService } from '../../services/product-service/product.service';
import { ProductModel } from '../../models/product';
import { FormsModule } from '@angular/forms';
import { CartService } from '../../services/cart-service/cart.service';
import { HttpClientModule } from '@angular/common/http';
import { ProductSupplierService } from '../../services/product-supplier-service/product-supplier.service';
import { ProductSupplierModel } from '../../models/product-supplier';


@Component({
  selector: 'app-products',
  imports: [CommonModule, FormsModule, HttpClientModule],
  templateUrl: './products.component.html',
  styleUrl: './products.component.css'
})
export class ProductsComponent implements OnInit {

  products: ProductModel[] = [];
  suppliers: ProductSupplierModel[] = [];

  constructor(private productService: ProductService, private productSuppliersService: ProductSupplierService, private cartService: CartService){ }
  
  ngOnInit(): void {
    this.productService.getAll$().subscribe(payload => {
      this.products = payload;
    });
    this.productSuppliersService.getAllWithProducts$().subscribe(payload => {
      console.log(payload);
      this.suppliers = payload;
    });
  }

  buyClicked(shopItem: ProductModel){
    this.cartService.addProductToCart(shopItem);
    this.productService.removeAmountOfProduct(shopItem.amount, shopItem);
    if(shopItem.amount > shopItem.inStock){
      shopItem.amount = shopItem.inStock
    }
  };

}


