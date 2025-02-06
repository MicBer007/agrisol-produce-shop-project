import { Routes } from '@angular/router';
import { CustomerOverviewComponent } from './components/customer-overview/customer-overview.component';
import { CustomerOrderViewComponent } from './components/customer-order-view/customer-order-view.component';
import { ProductsComponent } from './components/products/products.component';

export const routes: Routes = [
   {path: "customer-overview", component: CustomerOverviewComponent},
   {path: "orders", component: CustomerOrderViewComponent},
   {path: "products", component: ProductsComponent},
   {path: '',   redirectTo: '/products', pathMatch: 'full'}
];