import { Routes } from '@angular/router';
import { HomeComponent } from './components/home/home.component';
import { ProductsComponent } from './components/products/products.component';
import { CartComponent } from './components/cart/cart.component';

export const routes: Routes = [
   {path: "home", component: HomeComponent},
   {path: "products", component: ProductsComponent},
   {path: "cart", component: CartComponent},
   {path: '',   redirectTo: '/home', pathMatch: 'full'}
];
