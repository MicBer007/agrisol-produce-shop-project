import { Injectable } from '@angular/core';
import { HttpService } from '../http-service/http.service';
import { map } from 'rxjs';
import { ProductDto } from '../../dto/product-dto';
import { ProductEvolver } from '../../evolvers/product-evolver';

@Injectable({
  providedIn: 'root'
})
export class ProductService {

  constructor(private httpService: HttpService) { }

  getAll$() {
    return this.httpService.get("https://localhost:7114/api/Product")
      .pipe(map(productList => {
        return (productList as ProductDto[]).map(productDto => ProductEvolver.toModel(productDto))
      }));
  }

  getProductWithSuppliers$(productId: string) {
    return this.httpService.get("https://localhost:7114/api/Product/Suppliers/" + productId)
      .pipe(map(product => {
        return ProductEvolver.toModel(product as ProductDto)
      }));
  }

}
