import { Component } from '@angular/core';
import { CustomerService } from '../../services/customer-service/customer.service';
import { CommonModule } from '@angular/common';
import { RouterLink, RouterLinkActive } from '@angular/router';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-navbar',
  imports: [CommonModule, FormsModule, RouterLink, RouterLinkActive],
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.css'
})
export class NavbarComponent {

  isNavbarCollapsed = false;

  constructor(private customerService: CustomerService){ }

  isUserLoggedIn(){
    return this.customerService.isUserLoggedIn();
  }

  getAmountOfProductsInCart(){
    var amount = this.customerService.getNumberOfProductTypesInCart();

    if(amount >= 10){
      return "10+";
    }

    return amount;
  }

  onSignOutClicked(){
    this.customerService.logout();
  }
  
}
