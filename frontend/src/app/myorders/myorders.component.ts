import { Component } from '@angular/core';
import { OrdersService } from '../services/orders.service';

@Component({
  selector: 'app-myorders',
  templateUrl: './myorders.component.html',
  styleUrls: ['./myorders.component.css']
})
export class MyordersComponent {
  orders: any = []
  user_id: string = ""

  constructor(private ordersService: OrdersService) {

  }


  async myOrders() {
    const userDetails = localStorage.getItem('user_details');
    this.user_id = userDetails ? JSON.parse(userDetails).user_id : "";

    console.log(userDetails);


    let response = await this.ordersService.getMyOrders(this.user_id)
    this.orders = response;
    
    if (response.ok) {
      console.log(response)

    } else {
      console.log('hhh');

    }

   
  }
  ngOnInit(){
    this.myOrders()
  }
}
