import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ProductsService } from '../services/products.service';

@Component({
  selector: 'app-edit-product',
  templateUrl: './edit-product.component.html',
  styleUrls: ['./edit-product.component.css']
})
export class EditProductComponent {

  name = "";
  price: number = 0;
  discount: number = 0;
  countInStock: number = 0;

  
  image = "";
  // Add similar variables for other product details
  error = false;
  errorMessage = "";
  productId: string = ""

  constructor(private route: ActivatedRoute,private router: Router, private productService: ProductsService) {

  }

  ngOnInit(): void {
    // Subscribe to route params to get the product ID
    this.route.params.subscribe(params => {
      this.productId = params['productId'];
      this.getProductDetails();
    });
  }

  // Assume you have a method to get product details by ID
  async getProductDetails() {

    
    // Replace 'productId' with the actual ID of the product to edit
    const productDetails = await this.productService.getProductById(this.productId);

    console.log(productDetails);
    
    this.name = productDetails.name;
    this.price = productDetails.price;
    this.discount = productDetails.discount;
    this.image = productDetails.image;
    this.countInStock = productDetails.countInStock;

    // Set other product details similarly
  }

  async onSubmit() {
    const updatedProductDetails = {
      name: this.name,
      price: this.price,
      discount: this.discount,
      image: this.image,
      countInStock:this.countInStock
      // Include other product details
    };

    // Call the service method to update product details
    const response = await this.productService.updateProduct(this.productId, updatedProductDetails);

    console.log("Response data is ", response);
  }


}