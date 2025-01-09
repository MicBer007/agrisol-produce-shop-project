import { Component, OnInit } from '@angular/core';
import { CustomerService } from '../../services/customer-service/customer.service';
import { CustomerModel } from '../../models/customer';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-customer-view',
  imports: [CommonModule, FormsModule],
  templateUrl: './customer-view.component.html',
  styleUrl: './customer-view.component.css'
})
export class CustomerViewComponent implements OnInit {

  customers: CustomerModel[] = [];

  constructor(private customerService: CustomerService) { }

  ngOnInit(): void {
    this.customerService.getAll$().subscribe(payload => {
      this.customers = payload;
      console.log(payload);
    });
  }

  onCustomerRemoveClicked(customer: CustomerModel){
    this.customerService.delete$(customer.id).subscribe(payload => {
      console.log(payload);
      if(payload as boolean){
        this.customers.splice(this.customers.indexOf(customer), 1);
      }
    })
  }

  onCustomerEditClicked(customer: CustomerModel){
    this.customerService.put$(customer).subscribe(payload => {
      console.log(payload);
    });
  }

  customerFirstName: string = "";
  customerLastName: string = "";
  customerAgeString: string = "";
  customerBankDetails: string = "";
  onAddCustomerClicked(){
    var customerAge = Number(this.customerAgeString);
    var customerModel: CustomerModel = new CustomerModel("", this.customerFirstName, this.customerLastName, customerAge, this.customerBankDetails);
    this.customerService.add$(customerModel).subscribe(payload => {
      console.log(payload);
      customerModel.id = payload as string;
      this.customers.push(customerModel);
    });;
  }

}
