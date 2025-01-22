import { Routes } from '@angular/router';
import { HomeComponent } from './components/home/home.component';
import { CustomersOverviewComponent } from './components/customers-overview/customers-overview.component';
import { CustomerDetailComponent } from './components/customer-detail/customer-detail.component';
import { ProductsComponent } from './components/products/products.component';

export const routes: Routes = [
   {path: "home", component: HomeComponent},
   {path: "customers", component: CustomersOverviewComponent},
   {path: "customers/:id", component: CustomerDetailComponent},
   {path: "products", component: ProductsComponent},
   {path: '',   redirectTo: '/home', pathMatch: 'full'}
];