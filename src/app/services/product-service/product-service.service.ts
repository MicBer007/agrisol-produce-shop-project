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

  getAllProductsObservable$() {
    return this.httpService.get("https://localhost:7114/api/product")
      .pipe(map(productList => {
        return (productList as ProductDto[]).map(productDto => ProductEvolver.toModel(productDto))
      }));
  }

}
