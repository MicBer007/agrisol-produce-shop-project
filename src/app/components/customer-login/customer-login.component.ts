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

  constructor(private customerService: CustomerService) { }

  ngOnInit(): void {
    this.customerService.getAllCustomers$().subscribe(payload => {
      this.customers = payload;
    })
  }
  
  onLoginClicked(customer: CustomerModel) {
    this.customerService.loginAsCustomerWithId(customer.id);
  }

  onLogoutClicked(){
    this.customerService.logout();
  }

  isUserLoggedIn(){
    return this.customerService.isUserLoggedIn();
  }
  
}
