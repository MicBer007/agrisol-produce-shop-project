import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { ProductModel } from '../../models/product';
import { ProductService } from '../../services/product-service/product.service';
import { FormsModule } from '@angular/forms';
import { ProductDto } from '../../dto/product-dto';
import { ProductEvolver } from '../../evolvers/product-evolver';
import { ProductSupplierModel } from '../../models/product-supplier';
import { ProductSupplierService } from '../../services/product-supplier-service/product-supplier.service';

@Component({
  selector: 'app-edit-product',
  imports: [CommonModule, FormsModule],
  templateUrl: './edit-product.component.html',
  styleUrl: './edit-product.component.css'
})
export class EditProductComponent {

  name: string = "";
  price: string = "";
  stockAmount: string = "";
  pictureName: string = "";
  
  productSuppliers: ProductSupplierModel[] = [];
  products: ProductModel[] = [];

  momentsCreated: string[] = [];

  constructor(private productService: ProductService, private productSupplierService: ProductSupplierService){
    this.productService.getAllWithRelatedData$().subscribe(payload => {
      this.products = payload;
      console.log(payload);
    });
    this.productSupplierService.getAllWithRelatedData$().subscribe(payload => {
      this.productSuppliers = payload;
      console.log(payload);
    });
  }

  onAddProductClicked(){
    let price: number = Number(this.price);
    let stockAmount: number = Number(this.stockAmount);

    if(this.name == "") {
      console.log("You must supply a name for the product!");
      return;
    }
    if(this.price == "" || Number.isNaN(price) || Number.isNaN(stockAmount)){
      console.log("Price needs a integer value!");
      return;
    };
    if(this.stockAmount == "" || stockAmount < 0){
      console.log("Stock amount has an incorrect value!");
      return;
    }

    var picturePath = "assets/" + this.pictureName;
    var productModel = new ProductModel("", this.name, parseInt(this.price), parseInt(this.stockAmount), 1, picturePath, [], []);
    this.productService.add$(productModel).subscribe(payload => {
      console.log(payload)
      this.products.push(ProductEvolver.toModel(payload as ProductDto));
    });
  }

  onDeleteProductClicked(product: ProductModel) {
    this.productService.delete$(product.id).subscribe(payload => {
      console.log(payload);
      if(payload as boolean){
        this.products.splice(this.products.findIndex(p => p == product), 1);
      }
    });
  }

  onEditProductClicked(product: ProductModel) {
    this.productService.put$(product).subscribe(payload => {
      console.log(payload);
    });
  }

  selectedProductModel?: ProductModel = undefined;
  setSelectedProduct(productModel: ProductModel) {
    this.selectedProductModel = productModel;
    this.checkIfButtonsShouldBeEnabled();
  }

  selectedProductSupplierModel?: ProductSupplierModel = undefined;
  setSelectedProductSupplier(productSupplierModel: ProductSupplierModel) {
    this.selectedProductSupplierModel = productSupplierModel;
    let id = this.selectedProductSupplierModel.id!;
    this.momentsCreated = [];
    this.selectedProductSupplierModel.products.forEach(p => this.productSupplierService.getMomentRelationshipCreated$(p.id, id).subscribe(payload => {
      console.log(payload);
      this.momentsCreated.push(payload.toString());
    }))
    this.checkIfButtonsShouldBeEnabled();
  }

  addButtonShouldBeDisabled = true;
  removeButtonShouldBeDisabled = true;
  checkIfButtonsShouldBeEnabled() {
    this.addButtonShouldBeDisabled = true;
    this.removeButtonShouldBeDisabled = true;

    if(this.selectedProductModel == undefined || this.selectedProductSupplierModel == undefined) return;

    this.selectedProductSupplierModel.products.includes(this.selectedProductModel) ? this.removeButtonShouldBeDisabled = false : this.addButtonShouldBeDisabled = false;
  }

  addLinkClicked() {
    this.addButtonShouldBeDisabled = true;
    this.removeButtonShouldBeDisabled = true;
    this.productService.linkWithProductSupplier$(this.selectedProductSupplierModel?.id!, this.selectedProductModel?.id!).subscribe(payload => {
      console.log(payload);
      this.selectedProductSupplierModel!.products.push(this.products.find(p => p.id == this.selectedProductModel!.id)!);
      this.checkIfButtonsShouldBeEnabled();
    });
  }

  removeLinkClicked() {
    this.addButtonShouldBeDisabled = true;
    this.removeButtonShouldBeDisabled = true;
    this.productService.unlinkWithProductSupplier$(this.selectedProductSupplierModel?.id!, this.selectedProductModel?.id!).subscribe(payload => {
      console.log(payload);
      this.selectedProductSupplierModel?.products.splice(this.selectedProductSupplierModel?.products.indexOf(this.selectedProductModel!), 1);
      this.checkIfButtonsShouldBeEnabled();
    });
  }

}
