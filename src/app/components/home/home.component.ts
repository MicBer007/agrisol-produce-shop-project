import { Component, OnInit } from '@angular/core';
import { OrderService } from '../../services/order-service/order.service';
import { OrderModel } from '../../models/order';
import { CommonModule } from '@angular/common';
import { ProductSupplierModel } from '../../models/product-supplier';
import { ProductModel } from '../../models/product';
import { CustomerModel } from '../../models/customer';
import { ProductService } from '../../services/product-service/product.service';
import { ProductSupplierService } from '../../services/product-supplier-service/product-supplier.service';
import { CustomerService } from '../../services/customer-service/customer.service';
import { OrderStatus } from '../../models/order-status';

@Component({
  selector: 'app-home',
  imports: [CommonModule],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})
export class HomeComponent implements OnInit{

  orders: OrderModel[] = [];
  products: ProductModel[] = [];
  suppliers: ProductSupplierModel[] = [];
  customers: CustomerModel[] = [];

  constructor(private orderService: OrderService, private productService: ProductService, private supplierService: ProductSupplierService, private customerService: CustomerService) {}

  ngOnInit(): void {
    this.orderService.getAllWithRelatedData$().subscribe(payload => {
      this.orders = payload;
    })
    // this.productService.getAllWithRelatedData$().subscribe(payload => {
    //   this.products = payload;
    // })
    // this.supplierService.getAllWithRelatedData$().subscribe(payload => {
    //   this.suppliers = payload;
    // })
    // this.customerService.getAllWithRelatedData$().subscribe(payload => {
    //   this.customers = payload;
    // })
  }

  onTestButtonClicked(){
    this.orderService.add$(new OrderModel(undefined, "95cdcf59-5d79-4fed-b5e5-771f9e7a2f30", OrderStatus.Delivered, undefined, undefined, undefined, [])).subscribe(payload => console.log(payload));
  }
  
  onOtherTestButtonClicked(){
    this.orderService.delete$(this.orders[0].id!).subscribe(payload => console.log(payload));
  }

}
