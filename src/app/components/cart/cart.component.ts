import { Component, OnInit } from '@angular/core';
import { CustomerService } from '../../services/customer-services/customer.service';
import { CartModel } from '../../models/cart';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { Offcanvas } from 'bootstrap';

@Component({
  selector: 'app-cart',
  imports: [CommonModule],
  templateUrl: './cart.component.html',
  styleUrl: './cart.component.css'
})
export class CartComponent implements OnInit {

  cart?: CartModel = undefined;
  cartValue: number = 0;

  private cartOffcanvas?: Offcanvas = undefined;

  constructor(private customerService: CustomerService, private router: Router) { }

  ngOnInit(): void {
    this.customerService.getLoggedInCustomerObservable$().subscribe(customer => {
      
      if(this.customerService.isUserLoggedIn()) {

        this.sortCartAndDetermineCartValue(customer!.cart!);

        this.cart = customer!.cart!;

      } else 
          this.cart = undefined;
    });
    this.initializeCartOffcanvas();
  }

  private sortCartAndDetermineCartValue(cart: CartModel){ //TODO not working properly

    this.cartValue = 0;

    cart.cartProducts.sort((a, b) => b.quantity - a.quantity);
    cart.cartProducts.forEach(cP => this.cartValue += cP.quantity * cP.product!.price);
  }

  protected onCheckoutCartClicked(){
    this.hideCartOffcanvas();
    this.router.navigateByUrl("checkout");
  }

  protected showCartOffcanvas(){
    this.getCartOffcanvas().show();
  }

  protected hideCartOffcanvas(){
    this.getCartOffcanvas().hide();
  }

  private getCartOffcanvas(){
    return this.cartOffcanvas!;
  }

  private initializeCartOffcanvas(){
    this.cartOffcanvas = new Offcanvas("#cartOffcanvas");
  }

}