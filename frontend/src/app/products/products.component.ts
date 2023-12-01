import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { Product } from '../interfaces/product';
import { ProductsService } from '../services/products.service';

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.css']
})
export class ProductsComponent {
  products:Product[] = []
  error:boolean = false;
  errorMessage:string = ''

  constructor(private productsService: ProductsService, private router: Router){
    this.getProducts()
  }


  async getProducts(){
    let response = await this.productsService.getAllProducts();
  console.log(response);

  this.products = response.products
  
  }




  async deleteProduct(product: Product){
    if (confirm('Are you sure you want to delete this product?')) {
     
      const product_id = product.product_id as string
       let response = await this.productsService.deleteProduct(product_id)
      
       if(response.error){
        alert(response.error)
  
        setTimeout(() => {
          this.errorMessage = ''
        this.error = false
  
        }, 3000);
  
  
       }
  
       else if(response.message){
        this.getProducts();
  
       }

  }

  }

}
