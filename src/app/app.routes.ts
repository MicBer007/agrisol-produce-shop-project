import { Routes } from '@angular/router';
import { HomeComponent } from './components/home/home.component';
import { ProductsComponent } from './components/products/products.component';
import { CartComponent } from './components/cart/cart.component';
import { EditProductComponent } from './components/edit-product/edit-product.component';
import { CustomerViewComponent } from './components/customer-view/customer-view.component';
import { TransactionComponent } from './components/transaction/transaction.component';

export const routes: Routes = [
   {path: "home", component: HomeComponent},
   {path: "products", component: ProductsComponent},
   {path: "cart", component: CartComponent},
   {path: "edit", component: EditProductComponent},
   {path: "customer", component: CustomerViewComponent},
   {path: "transactions", component: TransactionComponent},
   {path: '',   redirectTo: '/products', pathMatch: 'full'}
];
