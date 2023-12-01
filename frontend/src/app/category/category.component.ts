import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Product } from '../interfaces/product';
import { ProductsService } from '../services/products.service';

@Component({
  selector: 'app-category',
  templateUrl: './category.component.html',
  styleUrls: ['./category.component.css']
})
export class CategoryComponent {

  categoryId: string = ""
  category: string = ""

  
  products:Product[] = []
  constructor(private route: ActivatedRoute,private router: Router, private productService: ProductsService) {

  }



  ngOnInit(): void {
    // Subscribe to route params to get the product ID
    this.route.params.subscribe(params => {
      this.categoryId = params['categoryId'];
      this.getCategoryProducts();
    });
  }

    async getCategoryProducts() {

    
    // Replace 'productId' with the actual ID of the product to edit
    const products = await this.productService.categoryProducts(this.categoryId);
      this.products = products
      console.log(products);
      

      this.category = products[0].category_name


    console.log(products);
    

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
