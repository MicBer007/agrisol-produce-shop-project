import { Injectable } from '@angular/core';
import { HttpService } from '../http.service';
import { BehaviorSubject, map } from 'rxjs';
import { ProductSupplierModel } from '../../models/product-supplier';
import { ProductSupplierEvolver } from '../../evolvers/product-supplier-evolver';
import { ProductSupplierDto } from '../../dto/product-supplier-dto';

@Injectable({
  providedIn: 'root'
})
export class ProductSupplierService {

  constructor(private httpService: HttpService) { }

  transactions$: BehaviorSubject<ProductSupplierModel[]> = new BehaviorSubject<ProductSupplierModel[]>([]);

  getAll$() {
    return this.httpService.get("https://localhost:7114/api/ProductSupplier")
      .pipe(map(dto => {
        return (dto as ProductSupplierDto[]).map(productSupplierDto => ProductSupplierEvolver.toModel(productSupplierDto));
      }));
  }

  getAllWithProducts$() {
    return this.httpService.get("https://localhost:7114/api/ProductSupplier/Products")
      .pipe(map(dto => {
        return (dto as ProductSupplierDto[]).map(productSupplierDto => ProductSupplierEvolver.toModel(productSupplierDto));
      }));
  }

  add$(productSupplierModel: ProductSupplierModel) {
    let dto = ProductSupplierEvolver.toDto(productSupplierModel);
    dto.productSupplierId = undefined;
    return this.httpService.post("https://localhost:7114/api/ProductSupplier", dto);
  }

  delete$(id: string) {
    return this.httpService.delete("https://localhost:7114/api/ProductSupplier/" + id, id);
  }

  put$(productSupplierModel: ProductSupplierModel) {
    let dto = ProductSupplierEvolver.toDto(productSupplierModel);
    return this.httpService.put("https://localhost:7114/api/ProductSupplier", dto);
  }

  linkWithProduct$(productSupplierId: string, productId: string){
    return this.httpService.putWithoutBody("https://localhost:7114/api/ProductSupplier/LinkProduct?supplierId=" + productSupplierId + "&productId=" + productId);
  }

  unlinkWithProduct$(productSupplierId: string, productId: string){
    return this.httpService.putWithoutBody("https://localhost:7114/api/ProductSupplier/UnlinkProduct?supplierId=" + productSupplierId + "&productId=" + productId);
  }
  
}
