import { Component } from '@angular/core';
import { Router } from '@angular/router';

import { userLogin } from '../interfaces/userLogin';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AuthService } from '../services/auth.service';
import { User } from '../interfaces/user';
import { UsersService } from '../services/users.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {
  loginForm!:FormGroup
  registrationForm!:FormGroup


  errorMessage:string = ''
  email:string = ''
  name:string = ''
  error:boolean = false;
  success:boolean = false;


  successMessage:string = ''
  loggingIn:boolean = false
  loggedInState:boolean = false

  loggedIn = false

  constructor(private fb:FormBuilder,private userService: UsersService,private authService:AuthService,private router: Router ){


    
    this.registrationForm = this.fb.group({
      name: ['',[Validators.required]],
      email: ['',[Validators.required]],
      password: ['',[Validators.required]],
      confirm_password: ['',[Validators.required]],
    })
  


    this.loginForm = this.fb.group({
      email: ['',[Validators.required]],
      password: ['',[Validators.required]],

    })
    
  }

  async createUser(){
    
    let user_details: User = this.registrationForm.value;
    
    if(user_details.password != user_details.confirm_password){
      this.error = true
      this.errorMessage = "Password Mismatch"

      setTimeout(() => {
        this.errorMessage = ''
      this.error = false

      }, 3000);

    }
    else{
     let response = await this.authService.registerUser(user_details)
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
      this.successMessage = "user Registered successfully"

           setTimeout( async() => {     
            this.success = false
            this.successMessage = ""
      
          this.router.navigate(['/login'])
        }, 2000);

     }
    }
    

  }




  async loginUser(){
    let user_details = this.loginForm.value
        let response = await this.authService.login(user_details)
    

    
        if(response.error){
          console.log(response)
          this.loggingIn = true
          this.errorMessage = response.error
    
          setTimeout(() => {
            this.errorMessage = ''
            this.loggingIn = false
          }, 3000);
          
        }else if(response.message){
          this.loggedInState = true
          this.successMessage = response.message
          this.loggedIn = true
          localStorage.setItem('loggedIn', `${this.loggedIn}`) 
          let user_details = await this.userService.checkDetails();
          localStorage.setItem('user_details', JSON.stringify(user_details));
          

          
    
          setTimeout( async() => {
            this.successMessage = ''
            this.loggedInState = false
            
            
    
         
              this.router.navigate(['my-account'])
            
          }, 2000);
     
        }
        
      
    
    }


}
