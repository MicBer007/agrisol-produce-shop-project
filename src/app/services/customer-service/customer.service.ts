import { Injectable } from '@angular/core';
import { HttpService } from '../http-service/http.service';
import { CustomerDto } from '../../dto/customer-dto';
import { CustomerEvolver } from '../../evolvers/customer-evolver';
import { map } from 'rxjs';
import { CustomerModel } from '../../models/customer';

@Injectable({
  providedIn: 'root'
})
export class CustomerService {

  constructor(private httpService: HttpService) { }

  getAll$() {
    return this.httpService.get("https://localhost:7114/api/Customer")
      .pipe(map(customerList => {
        return (customerList as CustomerDto[]).map(customerDto => CustomerEvolver.toModel(customerDto))
      }));
  }

  getCustomerWithOrder$(customerId: string) {
    return this.httpService.get("https://localhost:7114/api/Customer/Orders/" + customerId)
      .pipe(map(customer => {
        return CustomerEvolver.toModel(customer as CustomerDto)
      }));
  }
  
  add$(customerModel: CustomerModel){
    var customerDto = CustomerEvolver.toDto(customerModel);
    return this.httpService.post("https://localhost:7114/api/Customer", customerDto);
  }

  delete$(id: string){
    return this.httpService.delete("https://localhost:7114/api/Customer/" + id, id);
  }

  put$(customerModel: CustomerModel){
    var dto = CustomerEvolver.toDto(customerModel);
    return this.httpService.put("https://localhost:7114/api/Customer", dto);
  }

}
