import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Product } from '../interfaces/product';
import { OrdersService } from '../services/orders.service';

@Component({
  selector: 'app-checkout',
  templateUrl: './checkout.component.html',
  styleUrls: ['./checkout.component.css']
})
export class CheckoutComponent {

  userForm!:FormGroup;
  cart_itemsPrice:number = 0
  shippingPrice :number = 0;
  taxPrice:number = 0;
  totalPrice:number = 0;
  shipping_address:string =  ""
  user_id:string = ""
  created_at:string = " ";
  cartItems: Product[] = [];

  public lat:any;
  public lng:any;

  public ngOnInit(): void {
    this.getLocation();

    const storedCartItems = localStorage.getItem('cartItems');
    this.cartItems = storedCartItems ? JSON.parse(storedCartItems) : [];

    const storeduserDetails = localStorage.getItem('user_details');
    this.user_id = storeduserDetails ? JSON.parse(storeduserDetails).user_id : ``;


    this.cart_itemsPrice = Number(this.addDecimals(
      this.cartItems.reduce((acc, item) => acc + item.price * item.qty, 0)
    ))

    this.shippingPrice = Number(this.addDecimals(this.cart_itemsPrice > 100 ? 0 : 100))
    this.taxPrice = Number(this.addDecimals(Number((0.15 * this.cart_itemsPrice).toFixed(2))))

    this.totalPrice =  Number(
      Number(this.cart_itemsPrice) +
      Number(this.shippingPrice) +
      Number(this.taxPrice)
    )
    

  }

  


 addDecimals = (num:number) => {
    return (Math.round(num * 100) / 100).toFixed(2)
  }


  constructor(private router: Router,private fb: FormBuilder,private ordersServices:OrdersService) {
    this.userForm = this.fb.group({
      first_name: ['', Validators.required],
      last_name: ['', Validators.required],
      phone_number: ['', Validators.required],
      email_address: ['', Validators.email],
    });
  }


  getLocation() {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition((position: any) => {
        if (position) {
          console.log("Latitude: " + position.coords.latitude +
            "Longitude: " + position.coords.longitude);
          this.lat = position.coords.latitude;
          this.lng = position.coords.longitude;
          console.log(this.lat);
          console.log(this.lat);

          this.shipping_address = `${this.lat} ${this.lng}`
        }
      },
        (error:any) => console.log(error));
    } else {
      alert("Geolocation is not supported by this browser.");
    }
  }

  generateReceiptNumber(): string {
    const currentDate = new Date();
  
    // Extract components of the current time
    const year = currentDate.getFullYear().toString().slice(-2);
    const month = ('0' + (currentDate.getMonth() + 1)).slice(-2); // Month is zero-based
    const day = ('0' + currentDate.getDate()).slice(-2);
    const hours = ('0' + currentDate.getHours()).slice(-2);
    const minutes = ('0' + currentDate.getMinutes()).slice(-2);
    const seconds = ('0' + currentDate.getSeconds()).slice(-2);
  
    // Define additional characters to mix with time components
    const additionalChars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ!@#$%^&*';
  
    // Randomly choose a character from additionalChars
    const randomChar = additionalChars.charAt(
      Math.floor(Math.random() * additionalChars.length)
    );
  
    // Concatenate components and additional character to create the receipt number
    const receiptNumber =
      `${year}${month}${day}${hours}${minutes}${seconds}${randomChar}`;
  
    return receiptNumber;
  }
  

  async submitForm() {
    console.log("this form is ", this.userForm);
  
    const currentDatetime = new Date();
const currentTimeString = currentDatetime.toISOString();



    // Check if any form field is empty
    if (
      !this.userForm.value.first_name ||
      !this.userForm.value.last_name ||
      !this.userForm.value.phone_number ||
      !this.userForm.value.email_address
    ) {
      alert('Please fill in all form fields');
      return;
    }
  
  
    // Store all data in a single object
    const formData = {
      first_name: this.userForm.value.first_name,
      last_name: this.userForm.value.last_name,
      phone_number: this.userForm.value.phone_number,
      email_address: this.userForm.value.email_address,
      cartItemsPrice: this.cart_itemsPrice,
      shippingPrice: this.shippingPrice,
      taxPrice: this.taxPrice,
      totalPrice: this.totalPrice,
      shippingAddress: this.shipping_address,
      cartItems:this.cartItems,
      receipt:this.generateReceiptNumber(),
      user_id: this.user_id ,
      created_at:currentTimeString,
      is_paid:false
    };
  
    console.log("sdfghjk", formData);
    console.log(this.generateReceiptNumber());
    
   const response = await this.ordersServices.addOrderItems(formData)

   console.log(response);

   if(response.message){
    alert(response.message)
    this.router.navigate(['login']);
    localStorage.clear();
    console.log(localStorage.getItem('token'));
   }
   
    
    // Stringify the object and store in localStorage
    // localStorage.setItem('formData', JSON.stringify(formData));
  }



}
  
  
