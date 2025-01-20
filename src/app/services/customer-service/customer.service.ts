import { Injectable } from '@angular/core';
import { HttpService } from '../http.service';
import { CustomerModel } from '../../models/customer';
import { CustomerDto } from '../../dto/customer-dto';
import { CustomerEvolver } from '../../evolvers/customer-evolver';
import { map } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CustomerService {

  constructor(private httpService: HttpService) { }

  //CRUD
  getAll$() {
    return this.httpService.get("https://localhost:7114/api/Customer")
      .pipe(map(customerList => {
        return (customerList as CustomerDto[]).map(customerDto => CustomerEvolver.toModel(customerDto))
      }));
  }

  getAllWithTransactions$() {
    return this.httpService.get("https://localhost:7114/api/Customer/Transactions")
      .pipe(map(customerList => {
        return (customerList as CustomerDto[]).map(customerDto => CustomerEvolver.toModel(customerDto))
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
    console.log(dto);
    return this.httpService.put("https://localhost:7114/api/Customer", dto);
  }

}
