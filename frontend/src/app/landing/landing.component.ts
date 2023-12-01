import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { Category } from '../interfaces/category';
import { Product } from '../interfaces/product';
import { CategoriesService } from '../services/categories.service';
import { ProductsService } from '../services/products.service';




@Component({
  selector: 'app-landing',
  templateUrl: './landing.component.html',
  styleUrls: ['./landing.component.css']
})
export class LandingComponent {

  categories:Category[] = []
  products:Product[] = []
  error:boolean = false;
  errorMessage:string = ''
  searchText =""

  
  constructor(private productService: ProductsService,private categoryService: CategoriesService, private router: Router){
  


    this.getCategories()
    this.getProducts()
  }

  async getCategories(){
    let response = await this.categoryService.geCategories();
  console.log(response);

  this.categories = response

  }



  async getProducts() {

    
    // Replace 'productId' with the actual ID of the product to edit
    const products =await this.productService.getAllProducts();
      this.products = products.products
      console.log(products.products);
          

    // Set other product details similarly
  }

  addToCart(product: Product) {
    const storedCartItems = localStorage.getItem('cartItems');
    let cartItems: Product[] = storedCartItems ? JSON.parse(storedCartItems) : [];
  
    // Check if the product is already in the cart
    const existingProduct = cartItems.find(item => item.product_id === product.product_id);
  
    if (existingProduct) {
      // If the product is already in the cart, increment the quantity
      existingProduct.qty = (existingProduct.qty || 1) + 1;
    } else {
      // If the product is not in the cart, add it with a quantity of 1
      product.qty = 1;
      cartItems.push(product);
    }
  
    // Update the cartItems in localStorage
    localStorage.setItem('cartItems', JSON.stringify(cartItems));
  
    console.log("Cart items:", cartItems);
  }

   
  
  

}


