import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { ProductModel } from '../../models/product';
import { FormsModule } from '@angular/forms';
import { ProductService } from '../../services/product-service/product-service.service';
import { CustomerService } from '../../services/customer-services/customer.service';
import { Modal } from 'bootstrap';
import { CustomerLoginService } from '../../services/customer-services/customer-login.service';

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

  constructor(private productService: ProductService, private customerService: CustomerService, private customerLoginService: CustomerLoginService){ }
  
  ngOnInit(): void {
    this.getProductsFromDatabase();
  }

  private getProductsFromDatabase(){
    this.productService.getAllProductsObservable$().subscribe(payload => {
      this.products = payload;
    });
  }

  onBuyProductClicked(product: ProductModel) {
    if(!this.customerService.isUserLoggedIn()){

      this.customerLoginService.promptUserToLogInWithMessage("You need to log in to buy products!");

    } else {
      this.productToDetail = product;
      this.productBuyAmount = 0;

      this.showProductBuyModal();
    }
  }

  onAddDetailedProductToCartClicked(product: ProductModel){
    this.customerService.addProductToCartInAmount(product, this.productBuyAmount);
    this.hideProductBuyModal();
  }

  showProductBuyModal(){
    this.getProductBuyModal().show();
  }

  hideProductBuyModal(){
    this.getProductBuyModal().hide();
  }

  private productBuyModal?: Modal = undefined;

  private getProductBuyModal(){
    if(!this.productBuyModal) this.productBuyModal = new Modal("#productBuyModal");
    return this.productBuyModal!;
  }

  private customerLoginModal?: Modal = undefined;

  private getCustomerLoginModal(){
    if(!this.customerLoginModal) this.customerLoginModal = new Modal("#customerLoginModal");
    return this.customerLoginModal!;
  }

}