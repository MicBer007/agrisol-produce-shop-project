import { Component } from '@angular/core';
import { ProductSupplierService } from '../../services/product-supplier-service/product-supplier.service';

@Component({
  selector: 'app-home',
  imports: [],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})
export class HomeComponent {

  constructor(private productSupplierService: ProductSupplierService) {}

  onAddLinkClicked(){
    this.productSupplierService.linkWithProduct$("32C81734-A0F9-45D2-B613-7A5304C1FB6F", "4C004C7A-AA08-4714-9F2A-153DCE79154D").subscribe(payload => {
      console.log(payload);
    });
  }
  
  onRemoveLinkClicked(){
    this.productSupplierService.unlinkWithProduct$("32C81734-A0F9-45D2-B613-7A5304C1FB6F", "4C004C7A-AA08-4714-9F2A-153DCE79154D").subscribe(payload => {
      console.log(payload);
    });
  }

}
