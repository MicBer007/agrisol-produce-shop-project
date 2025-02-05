import { Injectable } from '@angular/core';
import { HttpService } from '../http-service/http.service';
import { CustomerDto } from '../../dto/customer-dto';
import { CustomerEvolver } from '../../evolvers/customer-evolver';
import { map } from 'rxjs';
import { CustomerModel } from '../../models/customer';
import { Router } from '@angular/router';
import { ProductModel } from '../../models/product';
import { CartProductModel } from '../../models/cart-product';
import { AddProductToCartRequestDto } from '../../dto/add-product-to-cart-request-dto';

@Injectable({
  providedIn: 'root'
})
export class CustomerService {

  private loggedInCustomer: CustomerModel | undefined = undefined;

  constructor(private httpService: HttpService, private router: Router) {
    this.logInAsCustomerWithId("4c004c7a-aa08-4714-9f2a-153dce79154d");
  }

  getLoggedInCustomer(){
    return this.loggedInCustomer;
  }

  logOut(){
    this.loggedInCustomer = undefined;
  }

  logInAsCustomerWithId(customerId: string){
    this.getCustomerWithCart$(customerId).subscribe(payload => {
      this.loggedInCustomer = payload;
      this.router.navigateByUrl("login"); //TODO would prefer if the individual login components could decided what to do with the new logged-in customer, maybe as a runnable.
    })
  }
  
  addProductToCartInAmount(product: ProductModel, quantity: number){
    if(this.loggedInCustomer == null || this.loggedInCustomer.cart == null) return;

    var cart = this.loggedInCustomer.cart;

    var requestDto: AddProductToCartRequestDto = {
      cartId: cart.id,
      productId: product.id,
      quantity: quantity
    };

    this.httpService.put("https://localhost:7114/api/cart/addproduct", requestDto).subscribe(changedDatabase => {
      if(!changedDatabase) return;
      var cartProduct: CartProductModel = new CartProductModel(quantity, product, cart);
      let duplicateCartProduct =  cart.cartProducts.find(cP => cP.product!.id == cartProduct.product!.id);
      if(duplicateCartProduct){
        duplicateCartProduct.quantity += cartProduct.quantity;
      } else {
        cart.cartProducts.push(cartProduct);
      }
    });
  }

  checkoutCustomerCart(){
    if(this.loggedInCustomer == null || this.loggedInCustomer.cart == null) return;
    
    var cart = this.loggedInCustomer.cart;

    this.httpService.putWithoutBody("https://localhost:7114/api/cart/checkout/" + cart.id).subscribe(newOrderId => {
      console.log(newOrderId);
      cart.cartProducts = [];
    });
  }

  getAll$() {
    return this.httpService.get("https://localhost:7114/api/customer")
      .pipe(map(customerList => {
        return (customerList as CustomerDto[]).map(customerDto => CustomerEvolver.toModel(customerDto))
      }));
  }

  getCustomerWithOrder$(customerId: string) {
    return this.httpService.get("https://localhost:7114/api/customer/orders/" + customerId)
      .pipe(map(customer => {
        return CustomerEvolver.toModel(customer as CustomerDto)
      }));
  }

  getCustomerWithCart$(customerId: string){
    return this.httpService.get("https://localhost:7114/api/customer/cart/" + customerId)
      .pipe(map(customer => {
        return CustomerEvolver.toModel(customer as CustomerDto)
      }));
  }
  
  // add$(customerModel: CustomerModel){
  //   var customerDto = CustomerEvolver.toDto(customerModel);
  //   return this.httpService.post("https://localhost:7114/api/customer", customerDto);
  // }

  // delete$(id: string){
  //   return this.httpService.delete("https://localhost:7114/api/customer/" + id, id);
  // }

  // put$(customerModel: CustomerModel){
  //   var dto = CustomerEvolver.toDto(customerModel);
  //   return this.httpService.put("https://localhost:7114/api/customer", dto);
  // }

}
