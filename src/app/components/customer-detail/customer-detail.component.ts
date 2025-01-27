import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { CustomerService } from '../../services/customer-service/customer.service';
import { CustomerModel } from '../../models/customer';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-customer-detail',
  imports: [CommonModule],
  templateUrl: './customer-detail.component.html',
  styleUrl: './customer-detail.component.css'
})
export class CustomerDetailComponent {

  customer: CustomerModel = new CustomerModel("", "", "", 0, "", []);

  orderStatusNames: string[] = ["In Cart", "Payed", "Delivered"];

  constructor(private route: ActivatedRoute, private customerService: CustomerService) {}

  ngOnInit(): void {
    const id = this.route.snapshot.paramMap.get('id');
    this.customerService.getCustomerWithOrder$(id!).subscribe(payload => {
      this.customer = payload;
    });
  }

  onCreateNewCustomerClicked(){
    this.customerService.add$(new CustomerModel("", "Jeffery", "Ridge", 10, "thingy", this.customer.orders));
  }

}
