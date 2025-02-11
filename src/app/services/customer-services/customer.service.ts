import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, Observer } from 'rxjs';
import { CustomerModel } from '../../models/customer';
import { ProductModel } from '../../models/product';
import { CartProductModel } from '../../models/cart-product';
import { CustomerApiService } from './customer-api.service';
import { CartModel } from '../../models/cart';

@Injectable({
  providedIn: 'root'
})
export class CustomerService {

  private loggedInCustomer$: BehaviorSubject<CustomerModel | undefined> = new BehaviorSubject<CustomerModel | undefined>(undefined);

  constructor(private customerApiService: CustomerApiService) {
    this.loginAsCustomerWithId("4c004c7a-aa08-4714-9f2a-153dce79154d");
  }

  getLoggedInCustomer(){
    return this.loggedInCustomer$.value;
  }

  getLoggedInCustomerObservable$(){
    return this.loggedInCustomer$;
  }

  isUserLoggedIn(){
    var customer = this.getLoggedInCustomer();
    return (customer && customer.cart)
  }

  getAllCustomers$() {
    return this.customerApiService.getAllCustomers$();
  }

  getNumberOfProductTypesInCart(){

    if(!this.isUserLoggedIn()) return 0;

    var loggedInCustomer = this.getLoggedInCustomer()!;
    var cart = loggedInCustomer.cart!;
    
    return cart.cartProducts.length;
  }

  logout(){
    this.loggedInCustomer$.next(undefined);
  }

  loginAsCustomerWithId(customerId: string){
    this.customerApiService.getCustomerByIdWithCart$(customerId).subscribe(loggedInCustomer => {

      this.loggedInCustomer$.next(loggedInCustomer);
    })
  }

  checkoutCustomerCart$(){

    if(!this.isUserLoggedIn()) return;

    var loggedInCustomer: CustomerModel = this.getLoggedInCustomer()!;
    var customerApiService: CustomerApiService = this.customerApiService;

    function sequenceSubscriber(observer: Observer<string>) {
  
      var cart = loggedInCustomer.cart!;
  
      customerApiService.checkoutCustomerCart$(cart).subscribe(newOrderId => {
        // cart.cartProducts = [];
        observer.next(newOrderId as string);
        observer.complete();
      });
  
      return {unsubscribe() {}};
    }
    
    return new Observable(sequenceSubscriber);
  }
  
  addProductToCartInAmount(product: ProductModel, quantity: number){

    if(!this.isUserLoggedIn()) return;

    var loggedInCustomer = this.getLoggedInCustomer()!;
    var cart = loggedInCustomer.cart!;

    this.callDatabaseToAddProductToCart(product, cart, quantity);
  }

  private callDatabaseToAddProductToCart(product: ProductModel, cart: CartModel, quantity: number){
    this.customerApiService.addProductToCart$(cart, product, quantity).subscribe(didDatabaseAddProduct => {

      if(!didDatabaseAddProduct) return;

      let cartProduct: CartProductModel = new CartProductModel(quantity, product, cart);

      this.addProductToCartWithoutCallingDatabase(cartProduct, cart);
    });
  }

  private addProductToCartWithoutCallingDatabase(cartProduct: CartProductModel, cart: CartModel){
      
    let isProductAlreadyInCart = cart.cartProducts.some(cP => cP.product!.id == cartProduct.product!.id)

    if(!isProductAlreadyInCart) 
        cart.cartProducts.push(cartProduct); 

    else {
      let duplicateCartProduct = cart.cartProducts.find(cP => cP.product!.id == cartProduct.product!.id)!;

      duplicateCartProduct.quantity += cartProduct.quantity;
    }

  }

}
