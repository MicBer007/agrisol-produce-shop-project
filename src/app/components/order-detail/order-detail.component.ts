import { Component, OnInit } from '@angular/core';
import { OrderService } from '../../services/order-service/order.service';
import { ActivatedRoute } from '@angular/router';
import { OrderModel } from '../../models/order';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-order-detail',
  imports: [CommonModule],
  templateUrl: './order-detail.component.html',
  styleUrl: './order-detail.component.css'
})
export class OrderDetailComponent implements OnInit{

  order?: OrderModel = undefined;

  orderStatusNames: string[] = ["Cancelled", "In Transit", "Paid", "Delivered"];

  constructor(private orderService: OrderService, private route: ActivatedRoute) { }

  ngOnInit(): void {
    let id = this.route.snapshot.paramMap.get('id');
    if(!id) return;
    this.orderService.getOrderById$(id).subscribe(order => {
      this.order = order;
    })
  }

}
