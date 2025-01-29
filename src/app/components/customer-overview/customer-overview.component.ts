import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CustomerService } from '../../services/customer-service/customer.service';
import { CustomerModel } from '../../models/customer';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-customer-overview',
  imports: [CommonModule, FormsModule],
  templateUrl: './customer-overview.component.html',
  styleUrl: './customer-overview.component.css'
})
export class CustomerOverviewComponent implements OnInit {

  customer?: CustomerModel = undefined;

  constructor(private customerService: CustomerService) {}

  ngOnInit(): void {
    this.customer = this.customerService.getLoggedInCustomer();
  }

}
