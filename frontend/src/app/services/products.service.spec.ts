import { TestBed } from '@angular/core/testing';

import { ProductsService } from './products.service';
import {HttpClientTestingModule, HttpTestingController} from '@angular/common/http/testing'

describe('ProductsService', () => {
  let service: ProductsService;
  let httpMock : HttpTestingController
  
  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [ProductsService]
    });
    service = TestBed.inject(ProductsService);
    httpMock = TestBed.inject(HttpTestingController)
  });
 
 

 
   it('should be created', () => {
     let mockProduct =
     {
      "name": "Sample name2",
      "price": 200,
      "discount": 3,
      "tags":"food,fastfood",
      "image": "/images/sample2.jpg",
      "category_id": "e7157789-4b30-4a64-a1d7-0e1137423883",
      "countInStock": 10,
      "numReviews": 0,
      "description": "Sample description"
     }
     
 
   service.createProduct(mockProduct).subscribe(res=>{
     expect(res).toEqual({"message": "Product registered successfully"})
   })
 
   const req = httpMock.expectOne('http://localhost:5000/product');
   expect(req.request.method).toEqual('POST')
   expect(req.request.body).toBe(mockProduct)
 
   req.flush({"message": "Product registered successfully"})
   });
 
   it('should be get all orders', () => {
  
     service.getAllProducts().subscribe(res=>{
       expect(res).toEqual({"message": "Category gotten all"})
     })
   
     const req = httpMock.expectOne('http://localhost:5000/product');
     expect(req.request.method).toEqual('GET')
   
   
     req.flush({"message": "got all"})
     });
 
 
 
       it('should be get individual product', () => {
       
         let product_id = "sadasdasdasd"
         service.getProductById(user_id).subscribe(res=>{
           expect(res).toEqual({"message": "Category gotten all"})
         })
       
         const req = httpMock.expectOne(`http://localhost:5000/product/${product_id}`);
         expect(req.request.method).toEqual('GET')
       
       
         req.flush({"message": "all "})
         });
 
               it('should update product', () => {
       
                let productData = {
                  name:"Product 1"
                }
         let product_id = "sadasdasdasd"
         service.updateProduct(order_id,productData).subscribe(res=>{
           expect(res).toEqual({"message": "Category gotten all"})
         })
       
         const req = httpMock.expectOne(`http://localhost:5000/product/${product_id}`);
         expect(req.request.method).toEqual('GET')
       
       
         req.flush({"message": "all "})
         });

         it('should delete product', () => {
       
          let productData = {
            name:"Product 1"
          }
   let product_id = "sadasdasdasd"
   service.deleteProduct(product_id).subscribe(res=>{
     expect(res).toEqual({"message": "Category deleted"})
   })
 
   const req = httpMock.expectOne(`http://localhost:5000/product/${product_id}`);
   expect(req.request.method).toEqual('DELETE')
 
 
   req.flush({"message": "all "})
   });

   it('should be get individual product', () => {
       
    let CATEGORY_id = "sadasdasdasd"
    service.categoryProducts(CATEGORY_id).subscribe(res=>{
      expect(res).toEqual({"message": "Category gotten all"})
    })
  
    const req = httpMock.expectOne(`http://localhost:5000/product/category/${CATEGORY_id}`);
    expect(req.request.method).toEqual('GET')
  
  
    req.flush({"message": "all "})
    });


});
