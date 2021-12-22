import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AddProductsComponent } from './add-products/add-products.component';
import { ViewProductsComponent } from './functions/view-products/view-products.component';
import { HomeComponent } from './home/home.component';
import { LoginComponent } from './login/login.component';

const routes: Routes = [
  {path : 'login', component: LoginComponent},
  {path : '', component: HomeComponent},
  {path : "product/inventory",component : AddProductsComponent},
  {path : "product/inventory:edit",component : AddProductsComponent},
  {path : "products", component : ViewProductsComponent},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
