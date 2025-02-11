import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { CustomerService } from '../../services/customer-services/customer.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-cart-checkout',
  imports: [CommonModule],
  templateUrl: './cart-checkout.component.html',
  styleUrl: './cart-checkout.component.css'
})
export class CartCheckoutComponent implements OnInit {

  paid: boolean = false;
  orderId?: string = undefined;

  constructor(private customerService: CustomerService, private router: Router) { }

  ngOnInit(): void {
    this.paid = false;
  }

  protected onPayClicked(){
    this.customerService.checkoutCustomerCart$()?.subscribe(newOrderId => {
      this.orderId = newOrderId;
    });
    this.paid = true;
  }

  protected onViewOrderClicked(){
    console.log("View orders clicked!")
    this.router.navigateByUrl("order/" + this.orderId!);
  }

}
