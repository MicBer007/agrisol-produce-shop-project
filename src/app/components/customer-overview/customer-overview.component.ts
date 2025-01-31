import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CustomerService } from '../../services/customer-service/customer.service';
import { CustomerModel } from '../../models/customer';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-customer-overview',
  imports: [CommonModule, FormsModule],
  templateUrl: './customer-overview.component.html',
  styleUrl: './customer-overview.component.css'
})
export class CustomerOverviewComponent implements OnInit {

  customer?: CustomerModel = undefined;

  constructor(private customerService: CustomerService, private router: Router) {}

  ngOnInit(): void {
    this.customer = this.customerService.getLoggedInCustomer();
  }

  onViewOrdersClicked(){
    this.router.navigateByUrl("orders");
  }

  onGoToLoginPageClicked(){
    this.router.navigateByUrl("login");
  }

}
