import { Component, Pipe, PipeTransform, TemplateRef } from '@angular/core';
import { CustomerService } from '../../services/customer-service/customer.service';
import { CustomerModel } from '../../models/customer';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { SimplifiedOrder, ToSimplifiedOrder } from '../../models/simplified-order';
import { OrderModel } from '../../models/order';
import { OrderService } from '../../services/order-service/order.service';

@Pipe({name: 'ensureThreeItems'})
export class FilterPipe implements PipeTransform {
  transform(items: any[], property: string, value: any): any[] {
    return items.filter(item => {
      return item[property] === value;
    });
  }
}

@Component({
  selector: 'app-customer-order-view',
  imports: [CommonModule],
  templateUrl: './customer-order-view.component.html',
  styleUrl: './customer-order-view.component.css'
})

export class CustomerOrderViewComponent {

  orderToDetail?: OrderModel = undefined;
  total: number = -1;
  
  orders: OrderModel[] = [];
  simplifiedOrders: SimplifiedOrder[] = [];

  loading: boolean = false;

  orderStatusNames: string[] = ["Cancelled", "In Transit", "Payed", "Delivered"];

  constructor(private customerService: CustomerService, private orderService: OrderService, private router: Router) {}

  ngOnInit(): void {
    this.subscribeToLoggedInCustomerToGetCustomerOrders();
  }

  subscribeToLoggedInCustomerToGetCustomerOrders(){
    this.loading = true;

    this.customerService.getLoggedInCustomerObservable$().subscribe(customer => {

      if(!customer) {
        
        this.loading = false;
        this.orders = [];
        this.simplifiedOrders = [];
        return;

      } else {

        this.subscribeToGetCustomerOrders(customer);
      }
    });
  }

  subscribeToGetCustomerOrders(customer: CustomerModel){
    this.orderService.getOrdersOfCustomer$(customer.id).subscribe(payload => {

      this.orders = payload;

      this.simplifiedOrders = this.orders.map(ToSimplifiedOrder);
      this.simplifiedOrders.sort((a, b) => a.status - b.status);

      this.loading = false;
    });
  }

  onGoToLoginPageClicked(){
    this.router.navigateByUrl("login");
  }

  onViewMoreDetailsClicked(order: SimplifiedOrder){
    this.orderToDetail = this.orders.find(o => o.id! == order.id);
    this.total = order.value;
  }

}
