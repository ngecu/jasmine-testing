import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { UsersService } from '../services/users.service';

@Component({
  selector: 'app-editaccount',
  templateUrl: './editaccount.component.html',
  styleUrls: ['./editaccount.component.css']
})
export class EditaccountComponent {
  name = ""
  email= ""
  password=""
  confirmPassword=""
  error=false
  errorMessage = ""

  constructor(private router: Router,private userServices:UsersService) {
    this.getDetails()
  }

     storedUserDetails = localStorage.getItem('user_details') as string;
   parsedUserDetails = JSON.parse(this.storedUserDetails);


  getDetails(){

    this.name = this.parsedUserDetails.name
    this.email = this.parsedUserDetails.email

  }


  async onSubmit() {

    const updatedUserDetails = {
      name: this.name,
      email: this.email,
      password: this.password,
      

    };

    if(updatedUserDetails.password == this.confirmPassword){
      const response = await this.userServices.updateUserDetails(this.parsedUserDetails.user_id,updatedUserDetails)

      console.log("response data is ",response);

    }
    else{
      this.error = false
      this.errorMessage="Password Mismatch"
    }
   

    
}

}
