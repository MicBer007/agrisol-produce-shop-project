import { Injectable } from '@angular/core';
import { HttpService } from '../http-service/http.service';
import { map } from 'rxjs';
import { OrderDto } from '../../dto/order-dto';
import { OrderEvolver } from '../../evolvers/order-evolver';

@Injectable({
  providedIn: 'root'
})
export class OrderService {

  constructor(private httpService: HttpService) { }
  
  getOrdersOfCustomer$(customerId: string) {
    return this.httpService.get("https://localhost:7114/api/order/Customer/" + customerId)
      .pipe(map(orderList => {
        return (orderList as OrderDto[]).map(orderDto => OrderEvolver.toModel(orderDto))
      }));
  }

  getOrderById$(orderId: string){
    return this.httpService.get("https://localhost:7114/api/order/" + orderId)
      .pipe(map(order => OrderEvolver.toModel(order as OrderDto)));
  }

}
