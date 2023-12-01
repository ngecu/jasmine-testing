import { Component } from '@angular/core';
import { Product } from '../interfaces/product';

@Component({
  selector: 'app-basket',
  templateUrl: './basket.component.html',
  styleUrls: ['./basket.component.css']
})
export class BasketComponent {

 cartItems: Product[] = [];
 button_disabled = false;
  subtotal : Number = 0
  total_items : Number  = 0
  ngOnInit(): void {
    // Retrieve cart items from localStorage
    const storedCartItems = localStorage.getItem('cartItems');
    this.cartItems = storedCartItems ? JSON.parse(storedCartItems) : [];

 
   this.subtotal =  Number(this.cartItems
      .reduce((acc, item) => acc + item?.qty * item.price, 0)
      .toFixed(2))


    this.total_items = Number(this.cartItems.reduce((acc, item) => acc + item.qty, 0))

    if(this.cartItems.length == 0){
      this.button_disabled = true;
    }
  }


  removeFromCart(product: Product) {
    const index = this.cartItems.findIndex(item => item.product_id === product.product_id);
  
    if (index !== -1) {
      // Reduce quantity or remove the product from the cart
      if (this.cartItems[index].qty > 1) {
        this.cartItems[index].qty--;
      } else {
        this.cartItems.splice(index, 1);
      }
  
      // Update local storage
      localStorage.setItem('cartItems', JSON.stringify(this.cartItems));

      this.subtotal =  Number(this.cartItems
        .reduce((acc, item) => acc + item?.qty * item.price, 0)
        .toFixed(2))
  
  
      this.total_items = Number(this.cartItems.reduce((acc, item) => acc + item.qty, 0))

      
    }
  }

  
  addToCart(product: Product) {
    const index = this.cartItems.findIndex(item => item.product_id === product.product_id);
  
    if (index !== -1) {
      // Increment quantity
      this.cartItems[index].qty++;
  
      // Update local storage
      localStorage.setItem('cartItems', JSON.stringify(this.cartItems));
    } else {
      // Add new product to the cart
      this.cartItems.push({ ...product, qty: 1 });
  
      // Update local storage
      localStorage.setItem('cartItems', JSON.stringify(this.cartItems));
    }
  
    // Recalculate subtotal and total_items
    this.subtotal = Number(
      this.cartItems.reduce((acc, item) => acc + item.qty * item.price, 0).toFixed(2)
    );
  
    this.total_items = Number(this.cartItems.reduce((acc, item) => acc + item.qty, 0));
  }
  
  

  

}
