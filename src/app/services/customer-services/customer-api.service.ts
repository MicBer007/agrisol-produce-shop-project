import { Injectable } from '@angular/core';
import { HttpService } from '../http-service/http.service';
import { CustomerEvolver } from '../../evolvers/customer-evolver';
import { CustomerDto } from '../../dto/customer-dto';
import { AddProductToCartRequestDto } from '../../dto/add-product-to-cart-request-dto';
import { map } from 'rxjs';
import { CartModel } from '../../models/cart';
import { ProductModel } from '../../models/product';

@Injectable({
  providedIn: 'root'
})
export class CustomerApiService {

  constructor(private httpService: HttpService) { }

  checkoutCustomerCart$(cart: CartModel){
    return this.httpService.putWithoutBody("https://localhost:7114/api/cart/checkout/" + cart.id)
  }

  addProductToCart$(cart: CartModel, product: ProductModel, quantity: number){
    var requestDto: AddProductToCartRequestDto = {
      cartId: cart.id,
      productId: product.id,
      quantity: quantity
    };

    return this.httpService.put("https://localhost:7114/api/cart/addproduct", requestDto);
  }

  getAllCustomers$() {
    return this.httpService.get("https://localhost:7114/api/customer")
      .pipe(map(customerList => {
        return (customerList as CustomerDto[]).map(customerDto => CustomerEvolver.toModel(customerDto))
      }));
  }

  getCustomerByIdWithCart$(customerId: string){
    return this.httpService.get("https://localhost:7114/api/customer/cart/" + customerId)
      .pipe(map(customer => {
        return CustomerEvolver.toModel(customer as CustomerDto)
      }));
  }

}
