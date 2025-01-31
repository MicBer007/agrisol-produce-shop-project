import { Component, Pipe, PipeTransform, TemplateRef } from '@angular/core';
import { CustomerService } from '../../services/customer-service/customer.service';
import { CustomerModel } from '../../models/customer';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { SimplifiedOrder, ToSimplifiedOrder } from '../../models/simplified-order';
import { OrderModel } from '../../models/order';

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

  customer?: CustomerModel = undefined;

  simplifiedOrders: SimplifiedOrder[] = [];

  orderStatusNames: string[] = ["In Cart", "Payed", "Delivered"];

  constructor(private customerService: CustomerService, private router: Router) {}

  ngOnInit(): void {
    this.customer = this.customerService.getLoggedInCustomer();
    if(this.customer != undefined){
      this.simplifiedOrders = this.customer.orders.map(o => ToSimplifiedOrder(o));
      this.simplifiedOrders.sort((a, b) => a.status - b.status);
    }
  }

  onGoToLoginPageClicked(){
    this.router.navigateByUrl("login");
  }

  onViewMoreDetailsClicked(order: SimplifiedOrder){
    this.orderToDetail = this.customer?.orders.find(o => o.id! == order.id);
    this.total = order.value;
  }

}
