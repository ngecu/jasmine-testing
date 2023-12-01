import { Component } from '@angular/core';
import { Router } from '@angular/router';
@Component({
  selector: 'app-myaccount',
  templateUrl: './myaccount.component.html',
  styleUrls: ['./myaccount.component.css']
})
export class MyaccountComponent {
  name = ""
  constructor(private router: Router) {
    this.getDetails()
  }


  getDetails(){
   const storedUserDetails = localStorage.getItem('user_details') as string;
   const parsedUserDetails = JSON.parse(storedUserDetails);
    this.name = parsedUserDetails.name
  }

 

  Logout() {
    this.router.navigate(['login']);
    localStorage.clear();
    console.log(localStorage.getItem('token'));
  }

}
