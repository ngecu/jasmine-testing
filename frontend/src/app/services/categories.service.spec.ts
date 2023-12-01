import { TestBed } from '@angular/core/testing';

import { CategoriesService } from './categories.service';
import {HttpClientTestingModule, HttpTestingController} from '@angular/common/http/testing'

describe('CategoriesService', () => {
  let service: CategoriesService;
   let httpMock : HttpTestingController

   beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [CategoriesService]
    });
    service = TestBed.inject(CategoriesService);
    httpMock = TestBed.inject(HttpTestingController)
  });



  it('should be created', () => {
    let mockCategory =
    {
      category_id: "string",
      category_name: "string",
      category_image: "string",
      category_description: "string", 
    
  }

  service.createCategory(mockCategory).subscribe(res=>{
    expect(res).toEqual({"message": "Category registered successfully"})
  })

  const req = httpMock.expectOne('http://localhost:5000/categoryr');
  expect(req.request.method).toEqual('POST')
  expect(req.request.body).toBe(mockCategory)

  req.flush({"message": "Categoy registered successfully"})
  });


    it('should be get all categories', () => {
 
  service.getCategories().subscribe(res=>{
    expect(res).toEqual({"message": "Category registered successfully"})
  })

  const req = httpMock.expectOne('http://localhost:5000/category');
  expect(req.request.method).toEqual('GET')


  req.flush({"message": "got all"})
  });

      it('should be get one category', () => {
 
        let user_id ="asdsadasdasdasd"
  service.getOneCategory(user_id).subscribe(res=>{
    expect(res).toEqual({"message": "One category got successfully"})
  })

  const req = httpMock.expectOne(`http://localhost:5000/category/${user_id}`);
  expect(req.request.method).toEqual('GET')


  req.flush({"message": "One category got successfully"})
  });

  it('should be delete category', () => {
 
    let user_id ="asdsadasdasdasd"
service.deleteCategory(user_id).subscribe(res=>{
expect(res).toEqual({"message": "One category deleted successfully"})
})

const req = httpMock.expectOne(`http://localhost:5000/category/${user_id}`);
expect(req.request.method).toEqual('DELETE')


req.flush({"message": "One category deleted successfully"})
});

});
