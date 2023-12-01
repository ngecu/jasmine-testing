import { Component } from '@angular/core';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.css']
})
export class SidebarComponent {

  role:number = 0
  constructor(){
    this.check()
  }

  async check(){
    const userDetails = localStorage.getItem('user_details');
    this.role = userDetails ? JSON.parse(userDetails).role : 0;


    console.log(this.role);
    
  }



}
