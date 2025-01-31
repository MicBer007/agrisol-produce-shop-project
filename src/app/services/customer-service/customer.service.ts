import { Injectable, OnInit } from '@angular/core';
import { HttpService } from '../http-service/http.service';
import { CustomerDto } from '../../dto/customer-dto';
import { CustomerEvolver } from '../../evolvers/customer-evolver';
import { map } from 'rxjs';
import { CustomerModel } from '../../models/customer';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class CustomerService {

  private loggedInCustomer: CustomerModel | undefined = undefined;

  constructor(private httpService: HttpService, private router: Router) {
    this.logInAsCustomerWithId("4c004c7a-aa08-4714-9f2a-153dce79154d");
  }

  getLoggedInCustomer(){
    return this.loggedInCustomer;
  }

  logOut(){
    this.loggedInCustomer = undefined;
  }

  logInAsCustomerWithId(customerId: string){ //accreditationDetails CustomerLoginDetails
    // this.getCustomerDetailsThroughLogin$(customer, accreditationDetails).subscribe(payload => {})
    this.getCustomerWithOrder$(customerId).subscribe(payload => {
      this.loggedInCustomer = payload;
      this.router.navigateByUrl("login"); //TODO would prefer if the individual login components could decided what to do with the new logged-in customer, maybe as a runnable.
    })
  }

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
  
  // add$(customerModel: CustomerModel){
  //   var customerDto = CustomerEvolver.toDto(customerModel);
  //   return this.httpService.post("https://localhost:7114/api/Customer", customerDto);
  // }

  // delete$(id: string){
  //   return this.httpService.delete("https://localhost:7114/api/Customer/" + id, id);
  // }

  // put$(customerModel: CustomerModel){
  //   var dto = CustomerEvolver.toDto(customerModel);
  //   return this.httpService.put("https://localhost:7114/api/Customer", dto);
  // }

}
