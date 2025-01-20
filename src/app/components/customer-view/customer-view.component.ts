import { Component, OnInit } from '@angular/core';
import { CustomerService } from '../../services/customer-service/customer.service';
import { CustomerModel } from '../../models/customer';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { CustomerDto } from '../../dto/customer-dto';
import { CustomerEvolver } from '../../evolvers/customer-evolver';
import { TransactionService } from '../../services/transaction-service/transaction.service';
import { TransactionModel } from '../../models/transaction';

@Component({
  selector: 'app-customer-view',
  imports: [CommonModule, FormsModule],
  templateUrl: './customer-view.component.html',
  styleUrl: './customer-view.component.css'
})
export class CustomerViewComponent implements OnInit {

  customers: CustomerModel[] = [];

  transactions: TransactionModel[] = [];

  constructor(private customerService: CustomerService, private transactionService: TransactionService) { }

  ngOnInit(): void {
    this.customerService.getAllWithTransactions$().subscribe(payload => {
      this.customers = payload;
      console.log(payload);
    });
    this.transactionService.getAll$().subscribe(payload => {
      this.transactions = payload;
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

  onCustomerSaveChangesClicked(customer: CustomerModel){
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
    var customerModel: CustomerModel = new CustomerModel("", this.customerFirstName, this.customerLastName, customerAge, this.customerBankDetails, []);
    this.customerService.add$(customerModel).subscribe(payload => {
      console.log(payload);
      var updatedCustomerModel = CustomerEvolver.toModel(payload as CustomerDto);
      this.customers.push(updatedCustomerModel);
    });;
  }

  addTransaction(customer: CustomerModel){
    var transaction: TransactionModel = new TransactionModel("", "Melons", 500, customer.id);
    this.transactionService.add$(transaction).subscribe(payload => {
      customer.transactions.push(transaction);
      console.log(payload);
    });
  }

}
