import { Routes } from '@angular/router';
import { CustomersOverviewComponent } from './components/customers-overview/customers-overview.component';
import { CustomerDetailComponent } from './components/customer-detail/customer-detail.component';

export const routes: Routes = [
   {path: "customers", component: CustomersOverviewComponent},
   {path: "customers/:id", component: CustomerDetailComponent},
   {path: '',   redirectTo: '/customers', pathMatch: 'full'}
];