import { Component } from '@angular/core';
import { CustomerModel } from '../../models/customer';
import { CustomerService } from '../../services/customer-services/customer.service';
import { CommonModule } from '@angular/common';
import { Modal } from 'bootstrap';
import { CustomerLoginService } from '../../services/customer-services/customer-login.service';

@Component({
  selector: 'app-customer-login',
  imports: [CommonModule],
  templateUrl: './customer-login.component.html',
  styleUrl: './customer-login.component.css'
})
export class CustomerLoginComponent {

  protected message: string = "Log in";

  protected customers: CustomerModel[] = [];

  constructor(private customerLoginPromptingService: CustomerLoginService, private customerService: CustomerService) { }

  ngOnInit(): void {
    this.getCustomerArrayFromService();
    this.initializeLoginPromptingResponsibility();
  }

  private getCustomerArrayFromService(){
    this.customerService.getAllCustomers$().subscribe(customersList => {
      this.customers = customersList;
    });
  }

  private initializeLoginPromptingResponsibility(){
    this.customerLoginPromptingService.getLoginPromptingResponsability$().subscribe(messageToPrompt => {

      if(!messageToPrompt) return;

      this.message = messageToPrompt;
      this.showCustomerLoginModal();
    });
  }
  
  protected onLoginClicked(customer: CustomerModel) {
    this.customerService.loginAsCustomerWithId(customer.id);
    this.hideCustomerLoginModal();
  }

  protected isUserLoggedIn(){
    return this.customerService.isUserLoggedIn();
  }

  protected showCustomerLoginModal(){
    this.getCustomerLoginModal().show();
  }

  protected hideCustomerLoginModal(){
    this.getCustomerLoginModal().hide();
  }

  private customerLoginModal?: Modal = undefined;

  private getCustomerLoginModal(){
    if(!this.customerLoginModal) this.customerLoginModal = new Modal("#customerLoginModal");
    return this.customerLoginModal!;
  }
  
}
