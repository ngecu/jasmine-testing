import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { Category } from '../interfaces/category';
import { CategoriesService } from '../services/categories.service';

@Component({
  selector: 'app-categories',
  templateUrl: './categories.component.html',
  styleUrls: ['./categories.component.css']
})
export class CategoriesComponent {

  categories:Category[] = []
  error:boolean = false;
  errorMessage:string = ''
  category:string = ""
  
  constructor(private categoryService: CategoriesService, private router: Router){
  


    this.getCategories()
  }

  async getCategories(){
    let response = await this.categoryService.geCategories();
  console.log(response);
  this.categories = response

  }

}
