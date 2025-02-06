import { Component, OnInit } from '@angular/core';
import { CustomerService } from '../../services/customer-service/customer.service';
import { CartModel } from '../../models/cart';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-cart',
  imports: [CommonModule],
  templateUrl: './cart.component.html',
  styleUrl: './cart.component.css'
})
export class CartComponent implements OnInit {

  cart?: CartModel = undefined;
  cartValue: number = 0;

  constructor(private customerService: CustomerService) { }

  ngOnInit(): void {
    this.customerService.getLoggedInCustomerObservable$().subscribe(customer => {
      
      if(this.customerService.isUserLoggedIn()) {

        this.sortCartAndDetermineCartValue(customer!.cart!);

        this.cart = customer!.cart!;

      } else 
          this.cart = undefined;
    });
  }

  private sortCartAndDetermineCartValue(cart: CartModel){

    cart.cartProducts.sort((a, b) => b.quantity - a.quantity);
    cart.cartProducts.forEach(cP => this.cartValue += cP.quantity * cP.product!.price);
  }

  onOrderNowClicked(){
    this.customerService.checkoutCustomerCart();
  }

}