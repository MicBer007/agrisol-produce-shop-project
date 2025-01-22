import { Injectable } from '@angular/core';
import { HttpService } from '../http.service';
import { OrderEvolver } from '../../evolvers/order-evolver';
import { map } from 'rxjs';
import { OrderDto } from '../../dto/order-dto';
import { OrderModel } from '../../models/order';

@Injectable({
  providedIn: 'root'
})
export class OrderService {

  constructor(private httpService: HttpService) { }

  //CRUD
  getAll$() {
    return this.httpService.get("https://localhost:7114/api/Order")
      .pipe(map(orderList => {
        return (orderList as OrderDto[]).map(orderDto => OrderEvolver.toModel(orderDto))
      }));
  }

  getAllWithRelatedData$() {
    return this.httpService.get("https://localhost:7114/api/Order/WithRelated")
      .pipe(map(orderList => {
        return (orderList as OrderDto[]).map(orderDto => OrderEvolver.toModel(orderDto))
      }));
  }
  
  add$(orderModel: OrderModel){
    var orderDto = OrderEvolver.toDto(orderModel);
    return this.httpService.post("https://localhost:7114/api/Order", orderDto);
  }

  delete$(id: string){
    return this.httpService.delete("https://localhost:7114/api/Order/" + id, id);
  }

  put$(orderModel: OrderModel){
    var dto = OrderEvolver.toDto(orderModel);
    return this.httpService.put("https://localhost:7114/api/Order", dto);
  }

  linkWithProduct$(orderId: string, productId: string, amount: number) {
    return this.httpService.putWithoutBody("https://localhost:7114/api/Order/Linkproduct?orderId=" + orderId + "&productId=" + productId + "&amount=" + amount);
  }

  unlinkWithProduct$(orderId: string, productId: string) {
    return this.httpService.putWithoutBody("https://localhost:7114/api/Order/UnlinkProduct?orderId=" + orderId + "&productId=" + productId);
  }

  getProductAmountInOrder$(productId: string, orderId: string) {
    return this.httpService.get("https://localhost:7114/api/ProductOrderJoin/ProductAmount?productId=" + productId + "&orderId=" + orderId);
  }

}