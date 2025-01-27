import { Component, OnInit } from '@angular/core';
import { CustomerService } from '../../services/customer-service/customer.service';
import { CustomerModel } from '../../models/customer';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';

@Component({
  selector: 'app-customers-overview',
  imports: [CommonModule],
  templateUrl: './customers-overview.component.html',
  styleUrl: './customers-overview.component.css'
})
export class CustomersOverviewComponent implements OnInit {

  customers: CustomerModel[] = [];

  constructor(private customerService: CustomerService, private router: Router) { }

  ngOnInit(): void {
    this.customerService.getAll$().subscribe(payload => {
      this.customers = payload;
    })
  }

  onViewCustomerClicked(customer: CustomerModel){

    this.router.navigateByUrl("customers/" + customer.id);
  }

}
