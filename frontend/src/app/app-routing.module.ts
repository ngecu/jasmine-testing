import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component';
import { LandingComponent } from './landing/landing.component';
import { CategoryComponent } from './category/category.component';
import { ProductComponent } from './product/product.component';
import { BasketComponent } from './basket/basket.component';
import { MyaccountComponent } from './myaccount/myaccount.component';
import { MyordersComponent } from './myorders/myorders.component';
import { EditaccountComponent } from './editaccount/editaccount.component';
import { UsersComponent } from './users/users.component';
import { CategoriesComponent } from './categories/categories.component';
import { OrdersComponent } from './orders/orders.component';
import { LostPasswordComponent } from './lost-password/lost-password.component';
import { ProductsComponent } from './products/products.component';
import { AddCategoryComponent } from './add-category/add-category.component';
import { AddProductComponent } from './add-product/add-product.component';
import { EditProductComponent } from './edit-product/edit-product.component';
import { CheckoutComponent } from './checkout/checkout.component';

const routes: Routes = [
  {path:'',component:LandingComponent},
  {path:'login',component:LoginComponent},
  {path:'register',component:RegisterComponent},
  {path:'basket',component:BasketComponent},
  {path:'my-account',component:MyaccountComponent},
  {path:'my-account/orders',component:MyordersComponent},
  {path:'my-account/edit-account',component:EditaccountComponent},
  {path:'my-account/users',component:UsersComponent},
  {path:'my-account/products',component:ProductsComponent},
  {path:'my-account/categories',component:CategoriesComponent},
  {path:'my-account/orders',component:OrdersComponent},
  {path:'category/:categoryId',component:CategoryComponent},
  {path:'product/:productId',component:ProductComponent},
  {path:'lost-password',component:LostPasswordComponent},
  {path:'add_category',component:AddCategoryComponent},
  {path:'add_product',component:AddProductComponent},
  {path:'my-account/edit_product/:productId',component:EditProductComponent},
  {path:'checkout',component:CheckoutComponent},

  
  

  

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
