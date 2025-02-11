import { Routes } from '@angular/router';
import { CustomerOverviewComponent } from './components/customer-overview/customer-overview.component';
import { CustomerOrderViewComponent } from './components/customer-order-view/customer-order-view.component';
import { ProductsComponent } from './components/products/products.component';
import { OrderDetailComponent } from './components/order-detail/order-detail.component';
import { CartCheckoutComponent } from './components/cart-checkout/cart-checkout.component';

export const routes: Routes = [
   {path: "customer-overview", component: CustomerOverviewComponent},
   {path: "orders", component: CustomerOrderViewComponent},
   {path: "products", component: ProductsComponent},
   {path: "checkout", component: CartCheckoutComponent},
   {path: 'order/:id', component: OrderDetailComponent },
   {path: '',   redirectTo: '/products', pathMatch: 'full'}
];