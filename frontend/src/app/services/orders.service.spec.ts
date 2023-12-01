import { TestBed } from '@angular/core/testing';

import { OrdersService } from './orders.service';
import {HttpClientTestingModule, HttpTestingController} from '@angular/common/http/testing'

describe('OrdersService', () => {
  let service: OrdersService;
  let httpMock : HttpTestingController

  beforeEach(() => {
   TestBed.configureTestingModule({
     imports: [HttpClientTestingModule],
     providers: [OrdersService]
   });
   service = TestBed.inject(OrdersService);
   httpMock = TestBed.inject(HttpTestingController)
 });


  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(OrdersService);
  });

  it('should be created', () => {
    let mockOrder =
    {
      product_id: "de9cbef3-5b0f-4a75-a128-b82b786b8119",
      paymentMethod: "YourPaymentMethodHere",
      itemsPrice: 100.00,
      taxPrice: 10.00,
      shippingPrice: 5.00,
      totalPrice: 115.00,
      user_id: "de81e039-eb07-45eb-b0ac-58022a963992",
      shipping_address: "your_shipping_address_value",
      first_name: "your_first_name_value",
      last_name: "your_last_name_value",
      phone_number: "your_phone_number_value",
      email_address: "your_email_address_value",
      payment_method: "your_payment_method_value",
      payment_result_id: "your_payment_result_id_value",
      payment_result_status: "your_payment_result_status_value",
      payment_result_update_time: "your_payment_result_update_time_value",
      payment_result_email_address: "your_payment_result_email_address_value",
      tax_price: 10.00,
      total_price: 100.00,
      is_paid: 1,
      paid_at: "2023-11-27T12:00:00"
    }
    

  service.addOrderItems(mockOrder).subscribe(res=>{
    expect(res).toEqual({"message": "Order registered successfully"})
  })

  const req = httpMock.expectOne('http://localhost:5000/order');
  expect(req.request.method).toEqual('POST')
  expect(req.request.body).toBe(mockOrder)

  req.flush({"message": "Order registered successfully"})
  });

  it('should be get all orders', () => {
 
    service.getOrders().subscribe(res=>{
      expect(res).toEqual({"message": "Category gotten all"})
    })
  
    const req = httpMock.expectOne('http://localhost:5000/category');
    expect(req.request.method).toEqual('GET')
  
  
    req.flush({"message": "got all"})
    });



      it('should be get my orders', () => {
      
        let user_id = "sadasdasdasd"
        service.getMyOrders(user_id).subscribe(res=>{
          expect(res).toEqual({"message": "Category gotten all"})
        })
      
        const req = httpMock.expectOne(`http://localhost:5000/order/myorders/${user_id}`);
        expect(req.request.method).toEqual('GET')
      
      
        req.flush({"message": "all "})
        });

              it('should be get order by id', () => {
      
        let order_id = "sadasdasdasd"
        service.getOrderById(order_id).subscribe(res=>{
          expect(res).toEqual({"message": "Category gotten all"})
        })
      
        const req = httpMock.expectOne(`http://localhost:5000/order/${order_id}`);
        expect(req.request.method).toEqual('GET')
      
      
        req.flush({"message": "all "})
        });

});
