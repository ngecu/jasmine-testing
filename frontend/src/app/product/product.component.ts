import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Product } from '../interfaces/product';
import { ProductsService } from '../services/products.service';

@Component({
  selector: 'app-product',
  templateUrl: './product.component.html',
  styleUrls: ['./product.component.css']
})
export class ProductComponent {

  productId: string = ""
  product!: Product 

  constructor(private route: ActivatedRoute,private router: Router, private productService: ProductsService) {

  }

  ngOnInit(): void {
    // Subscribe to route params to get the product ID
    this.route.params.subscribe(params => {
      this.productId = params['productId'];
      this.getProduct();
    });
  }

  async getProduct() {

    
    // Replace 'productId' with the actual ID of the product to edit
    const product = await this.productService.getProductById(this.productId);
      this.product = product
      console.log(product);

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
