import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { RegisterComponent } from './register/register.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { LoginComponent } from './login/login.component';
import { NavbarComponent } from './navbar/navbar.component';
import { LandingComponent } from './landing/landing.component';
import { FooterComponent } from './footer/footer.component';
import { SearchpageComponent } from './searchpage/searchpage.component';
import { CategoryComponent } from './category/category.component';
import { ProductComponent } from './product/product.component';
import { BasketComponent } from './basket/basket.component';
import { AdminComponent } from './admin/admin.component';
import { MyaccountComponent } from './myaccount/myaccount.component';
import { SidebarComponent } from './sidebar/sidebar.component';
import { MyordersComponent } from './myorders/myorders.component';
import { EditaccountComponent } from './editaccount/editaccount.component';
import { UsersComponent } from './users/users.component';
import { ProductsComponent } from './products/products.component';
import { CategoriesComponent } from './categories/categories.component';
import { OrdersComponent } from './orders/orders.component';
import { LostPasswordComponent } from './lost-password/lost-password.component';
import { CarouselComponent } from './carousel/carousel.component';
import { AddCategoryComponent } from './add-category/add-category.component';
import { AddProductComponent } from './add-product/add-product.component';
import { EditProductComponent } from './edit-product/edit-product.component';
import { CheckoutComponent } from './checkout/checkout.component';
import { CustomFilterPipePipe } from './custom-filter-pipe.pipe';


@NgModule({
  declarations: [
    AppComponent,
    RegisterComponent,
    LoginComponent,
    NavbarComponent,
    LandingComponent,
    FooterComponent,
    SearchpageComponent,
    CategoryComponent,
    CarouselComponent,
    ProductComponent,
    BasketComponent,
    AdminComponent,
    MyaccountComponent,
    SidebarComponent,
    MyordersComponent,
    EditaccountComponent,
    UsersComponent,
    ProductsComponent,
    CategoriesComponent,
    OrdersComponent,
    LostPasswordComponent,
    AddCategoryComponent,
    AddProductComponent,
    EditProductComponent,
    CheckoutComponent,
    CustomFilterPipePipe,
  ],
  imports: [
    AppRoutingModule,
    BrowserModule,
    FormsModule,
    ReactiveFormsModule,
    AppRoutingModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
