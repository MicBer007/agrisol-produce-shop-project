import { Routes } from '@angular/router';
import { HomeComponent } from './components/home/home.component';
import { ProductsComponent } from './components/products/products.component';
import { CartComponent } from './components/cart/cart.component';
import { AddProductComponent } from './components/add-product/add-product.component';

export const routes: Routes = [
   {path: "home", component: HomeComponent},
   {path: "products", component: ProductsComponent},
   {path: "cart", component: CartComponent},
   {path: "addproduct", component: AddProductComponent},
   {path: '',   redirectTo: '/products', pathMatch: 'full'}
];
