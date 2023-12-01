import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Category } from '../interfaces/category';
import { Product } from '../interfaces/product';
import { CategoriesService } from '../services/categories.service';
import { ProductsService } from '../services/products.service';

@Component({
  selector: 'app-add-product',
  templateUrl: './add-product.component.html',
  styleUrls: ['./add-product.component.css']
})
export class AddProductComponent {
  productForm!: FormGroup;
  categories:Category[] = [] // Replace with your actual categories

  error:boolean = false;
  success:boolean = false;
  errorMessage:string = ''
  successMessage:string = ''

  constructor(private categoryService: CategoriesService,private router: Router,private fb: FormBuilder,private productService:ProductsService) {
    this.getCategories()
   }

  ngOnInit() {
    this.initForm();
  }

  async getCategories(){
    let response = await this.categoryService.geCategories();
  console.log(response);

  this.categories = response

  }

  initForm() {
    this.productForm = this.fb.group({
      name: ['', Validators.required],
      price: [0, [Validators.required, Validators.min(0)]],
      discount: [0, Validators.min(0)],
      image: ['', Validators.required],
      category_id: ['', Validators.required],
      countInStock: [0, [Validators.required, Validators.min(0)]],
      numReviews: [0, Validators.min(0)],
      description: ['', Validators.required],
    });
  }

  async onSubmit() {
    if (this.productForm.valid) {
      const product: Product = this.productForm.value as Product;
      // Handle the submission, e.g., send the product to a service or API
      console.log(product);


      let response = await this.productService.createProduct(product)

      if(response.error){
        this.error = true
        this.errorMessage = response.error
  
        setTimeout(() => {
          this.errorMessage = ''
        this.error = false
  
        }, 3000);
  
  
       }
  
       else if(response.message){
        this.success = true
        this.successMessage = "Product Registered successfully"
  
             setTimeout( async() => {     
              this.success = false
              this.successMessage = ""
        
            this.router.navigate(['/my-account/products'])
          }, 2000);
  
       }

    }
  }

}
