import { Injectable } from '@angular/core';
import { ProductModel } from '../../models/product';
import { BehaviorSubject } from 'rxjs';
import { map } from 'rxjs';
import { ProductEvolver } from '../../evolvers/product-evolver';
import { ProductDto } from '../../dto/product-dto';
import { HttpService } from '../http.service';

@Injectable({
  providedIn: 'root'
})

export class ProductService {

  constructor(private httpService: HttpService) { }

  protected products: ProductModel[] = [];
  
  products$: BehaviorSubject<ProductModel[]> = new BehaviorSubject<ProductModel[]>([]);

  addAmountOfProduct(amount: number, product: ProductModel){ //implement the push and post methods on this
    var shopItems = this.products$.value

    var hasFoundMatch = false
    shopItems.forEach(shopItem => {
      if(shopItem.name === product.name && !hasFoundMatch){
        shopItem.inStock += amount
        hasFoundMatch = true
      }
    })
    if(!hasFoundMatch){
      shopItems.push(new ProductModel(product.id, product.name, product.price, product.inStock, 0, product.picturePath, [], []))
    }

    this.products$.next(shopItems)
  }

  removeAmountOfProduct(amount: number, product: ProductModel){ //implement the push method on this
    if(product.inStock < amount) return;
    product.inStock -= amount
  }

  getAll$() {
    return this.httpService.get("https://localhost:7114/api/Product")
      .pipe(map(dto => {
        return (dto as ProductDto[]).map(productDto  => ProductEvolver.toModel(productDto));
      }));
  }

  getAllWithRelatedData$() {
    return this.httpService.get("https://localhost:7114/api/Product/WithRelated")
      .pipe(map(dto => {
        return (dto as ProductDto[]).map(productDto  => ProductEvolver.toModel(productDto));
      }));
  }

  add$(productModel: ProductModel) {
    let dto = ProductEvolver.toDto(productModel);
    return this.httpService.post("https://localhost:7114/api/Product", dto);
  }

  delete$(id: string) {
    return this.httpService.delete("https://localhost:7114/api/Product/" + id, id);
  }

  put$(productModel: ProductModel) {
    let dto = ProductEvolver.toDto(productModel);
    return this.httpService.put("https://localhost:7114/api/Product", dto);
  }

  linkWithProductSupplier$(productSupplierId: string, productId: string) {
    return this.httpService.putWithoutBody("https://localhost:7114/api/Product/LinkSupplier?productId=" + productId + "&supplierId=" + productSupplierId);
  }

  unlinkWithProductSupplier$(productSupplierId: string, productId: string) {
    return this.httpService.putWithoutBody("https://localhost:7114/api/Product/UnlinkSupplier?productId=" + productId + "&supplierId=" + productSupplierId);
  }

  linkWithOrder$(productId: string, orderId: string, amount: number) {
    return this.httpService.putWithoutBody("https://localhost:7114/api/Product/LinkOrder?productId=" + productId + "&orderId=" + orderId + "&amount=" + amount);
  }

  unlinkWithOrder$(productId: string, orderId: string) {
    return this.httpService.putWithoutBody("https://localhost:7114/api/Product/UnlinkOrder?productId=" + productId + "&orderId=" + orderId);
  }

  getMomentRelationshipCreated$(productId: string, productSupplierId: string){
    return this.httpService.get("https://localhost:7114/api/ProductProductSupplierJoin/MomentCreated?productId=" + productId + "&productSupplierId=" + productSupplierId);
  }

  getProductAmountInOrder$(productId: string, orderId: string){
    return this.httpService.get("https://localhost:7114/api/ProductOrderJoin/ProductAmount?productId=" + productId + "&orderId=" + orderId);
  }

}
