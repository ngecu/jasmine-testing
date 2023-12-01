import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { User } from '../interfaces/user';
import { UsersService } from '../services/users.service';

@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.css']
})
export class UsersComponent {
  users:User[] = []
  error:boolean = false;
  errorMessage:string = ''
  role: number;
  
  constructor(private usersService: UsersService, private router: Router){
  
    const roleFromLocalStorage = localStorage.getItem('role');
    this.role = roleFromLocalStorage ? parseInt(roleFromLocalStorage, 10) : 0;

    // if (this.role !== 1) {
    //   this.router.navigate(['']);
    // }

    this.getUsers()
  }

  async getUsers(){
    let response = await this.usersService.getUsers();
  console.log(response);

  this.users = response.users
  
  }


  showProfileDetails(user: User){
    // console.log(index);
   

    console.log(user.user_id);
    
    this.router.navigate(['admin', user.user_id])

  }

  editProfile(user: User){
    // console.log(index);
   

    console.log(user.user_id);
    
    this.router.navigate(['admin','edit', user.user_id])

  }


  async deleteUser(user: User){
    if (confirm('Are you sure you want to delete this user?')) {
     
      const user_id = user.user_id as string
       let response = await this.usersService.deleteUser(user_id)
      
       if(response.error){
        alert(response.error)
  
        setTimeout(() => {
          this.errorMessage = ''
        this.error = false
  
        }, 3000);
  
  
       }
  
       else if(response.message){
        this.getUsers();
  
       }

  }

  }

  async toggleActivation(user: User) {
    try {
          
      const newActivationStatus:number = user.active === 1 ? 0 : 1 ;
      // console.log("new active status is ",newActivationStatus);

      const response = await this.usersService.updateActivationStatus(user.user_id as string, newActivationStatus);
        // let responseData = await response.json();

        console.log("reposne data is ",response);
        
        
     
      user.active = newActivationStatus;
      // console.log(`User ${user.full_name} is now ${newActivationStatus === 1 ? 'activated' : 'deactivated'}.`);
    } catch (error) {
      console.error('Error toggling activation status:', error);
    }
  }
  
}
