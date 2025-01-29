import { Component } from '@angular/core';
import { CustomerModel } from '../../models/customer';
import { CustomerService } from '../../services/customer-service/customer.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-customer-login',
  imports: [CommonModule],
  templateUrl: './customer-login.component.html',
  styleUrl: './customer-login.component.css'
})
export class CustomerLoginComponent {

  customers: CustomerModel[] = [];

  loggedInCustomer?: CustomerModel = undefined;

  constructor(private customerService: CustomerService) { }

  ngOnInit(): void {
    this.customerService.getAll$().subscribe(payload => {
      this.customers = payload;
    })
    this.loggedInCustomer = this.customerService.getLoggedInCustomer();
  }
  
  onLogInAsCustomerClicked(customer: CustomerModel) {
    this.customerService.logInAsCustomerWithId(customer.id);//TODO with accreditaion details from login form
  }

  onLogOutClicked(){
    this.customerService.logOut();
    this.loggedInCustomer = undefined;
  }
  
}
