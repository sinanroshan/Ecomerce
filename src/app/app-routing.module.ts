import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AddProductComponent } from './functions/add-product/add-product.component';
import { ViewProductsComponent } from './functions/view-products/view-products.component';
import { HomeComponent } from './home/home.component';
import { LoginComponent } from './login/login.component';

const routes: Routes = [
  {path : 'login', component: LoginComponent},
  {path : '', component: HomeComponent},
  {path : "addproducts",component : AddProductComponent},
  {path : "products", component : ViewProductsComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
