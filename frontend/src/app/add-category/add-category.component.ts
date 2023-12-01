import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { CategoriesService } from '../services/categories.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-add-category',
  templateUrl: './add-category.component.html',
  styleUrls: ['./add-category.component.css']
})
export class AddCategoryComponent {


  categoryForm: FormGroup;
  error:boolean = false;
  success:boolean = false;
  errorMessage:string = ''
  successMessage:string = ''

  constructor(private fb: FormBuilder,private categoryService:CategoriesService,private router: Router) {
    this.categoryForm = this.fb.group({
      category_name: ['', [Validators.required]],
      category_image: ['', [Validators.required]],
      category_description: ['', [Validators.required]]
    });
  }

  async onSubmit() {
    if (this.categoryForm.valid) {

      const formData = this.categoryForm.value;
      console.log(formData);

      let response = await this.categoryService.createCategory(this.categoryForm.value)

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
        this.successMessage = "Category Registered successfully"
  
             setTimeout( async() => {     
              this.success = false
              this.successMessage = ""

              alert("Category Registered successfully,you can add another or go back to categories")
        
            this.router.navigate(['/my-account/categories'])
          }, 2000);
  
       }

      this.categoryForm.reset();
    }
  }

}
