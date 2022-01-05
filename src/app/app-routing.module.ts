import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AddProductsComponent } from './add-products/add-products.component';
import { CompanyComponent } from './company/company.component';
import { AuthGuard } from './DataClass/auth-guard.guard';
import { ViewProductsComponent } from './functions/view-products/view-products.component';
import { HomeComponent } from './home/home.component';
import { LoginComponent } from './login/login.component';
import { OrdersComponent } from './orders/orders.component';

const routes: Routes = [
  {path : 'login', component: LoginComponent},
  {path : '', component: HomeComponent,canActivate:[AuthGuard],

  children:[
    {path:'home',component:HomeComponent,canActivate:[AuthGuard]},
    {path : "product/inventory",component : AddProductsComponent,canActivate:[AuthGuard]},
    {path : "product/inventory:edit",component : AddProductsComponent,canActivate:[AuthGuard]},
    {path : "products", component : ViewProductsComponent,canActivate:[AuthGuard]},
    {path : "orders", component : OrdersComponent,canActivate:[AuthGuard]},
    {path : "setings", component : CompanyComponent,canActivate:[AuthGuard]}
  ]
}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
