import { Component } from '@angular/core';
import { CustomerService } from '../../services/customer-service/customer.service';
import { CustomerModel } from '../../models/customer';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-customer-order-view',
  imports: [CommonModule],
  templateUrl: './customer-order-view.component.html',
  styleUrl: './customer-order-view.component.css'
})
export class CustomerOrderViewComponent {

  customer: CustomerModel = new CustomerModel("", "", "", 0, "", []);

  orderStatusNames: string[] = ["In Cart", "Payed", "Delivered"];

  constructor(private customerService: CustomerService) {}

  ngOnInit(): void {
    this.customer = this.customerService.getLoggedInCustomer()!;
  }

}
