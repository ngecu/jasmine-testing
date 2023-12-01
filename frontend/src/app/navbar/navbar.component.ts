import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import {
  Collapse,
  Dropdown,
  initTE,
} from "tw-elements";
import { Product } from '../interfaces/product';


@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {
  searchTerm: string = '';

  searchForm: FormGroup;
  loggedInTrue = localStorage.getItem('loggedIn');
  name = localStorage.getItem('name');
  role:number = 0 ;
  cartItems: Product[] = [];
  searchText=""

 
    products: Product[] = []; // Assume you have a list of products
    filteredProducts: Product[] = [];

  loggedIn = this.loggedInTrue;
  total_items : Number  = 0

  constructor(private fb: FormBuilder, private router: Router) {
    this.check()
    this.searchForm = this.fb.group({
      searchTerm: [''] 
      
    });
  }
  ngOnInit(): void {
    const storedCartItems = localStorage.getItem('cartItems');
    this.cartItems = storedCartItems ? JSON.parse(storedCartItems) : [];

 



    this.total_items = Number(this.cartItems.reduce((acc, item) => acc + item.qty, 0))

    if(this.cartItems.length == 0){
      this.total_items = 0
    }
    this.checkLoggedIn();
  }


  searchTours() {
    const searchTerm = this.searchTerm;
    console.log('Search Term:', this.searchTerm);
    if (!searchTerm) {
      alert('Search field is required');
      return;
    }
  
    console.log('Searching for tours with term:', searchTerm);
    this.router.navigate(['/search'], {
      queryParams: { term: searchTerm },
    });
  }
  
  

  checkLoggedIn() {
    console.log(this.loggedInTrue);
    if (this.loggedInTrue === 'true') {
    }
  }

  Logout() {
    this.router.navigate(['login']);
    localStorage.clear();
    console.log(localStorage.getItem('token'));
  }

  date = new Date();


  
  async check(){
    const userDetails = localStorage.getItem('user_details');
    this.role = userDetails ? JSON.parse(userDetails).role : 0;


    console.log(this.role);
    
  }
  
}
