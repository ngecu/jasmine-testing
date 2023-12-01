import { TestBed } from '@angular/core/testing';
import { ProductsService } from './products.service';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';

describe('ProductsService', () => {
  let service: ProductsService;
  let httpMock: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [ProductsService]
    });
    service = TestBed.inject(ProductsService);
    httpMock = TestBed.inject(HttpTestingController);
  });

  afterEach(() => {
    httpMock.verify();
  });

  it('should create a product', () => {
    let mockProduct = {
      // your mock product data
    };

    service.createProduct(mockProduct).subscribe(res => {
      expect(res).toEqual({ 'message': 'Product registered successfully' });
    });

    const req = httpMock.expectOne('http://localhost:5000/product');
    expect(req.request.method).toEqual('POST');
    expect(req.request.body).toBe(mockProduct);

    req.flush({ 'message': 'Product registered successfully' });
  });

  it('should get all products', () => {
    service.getAllProducts().subscribe(res => {
      expect(res).toEqual({ 'message': 'got all' });
    });

    const req = httpMock.expectOne('http://localhost:5000/product');
    expect(req.request.method).toEqual('GET');

    req.flush({ 'message': 'got all' });
  });

  it('should get an individual product', () => {
    let product_id = 'sadasdasdasd';

    service.getProductById(product_id).subscribe(res => {
      expect(res).toEqual({ 'message': 'all' });
    });

    const req = httpMock.expectOne(`http://localhost:5000/product/${product_id}`);
    expect(req.request.method).toEqual('GET');

    req.flush({ 'message': 'all' });
  });

  it('should update a product', () => {
    let productData = {
      name: 'Product 1'
    };
    let product_id = 'sadasdasdasd';

    service.updateProduct(product_id, productData).subscribe(res => {
      expect(res).toEqual({ 'message': 'all' });
    });

    const req = httpMock.expectOne(`http://localhost:5000/product/${product_id}`);
    expect(req.request.method).toEqual('PUT');

    req.flush({ 'message': 'all' });
  });

  it('should delete a product', () => {
    let product_id = 'sadasdasdasd';

    service.deleteProduct(product_id).subscribe(res => {
      expect(res).toEqual({ 'message': 'Category deleted' });
    });

    const req = httpMock.expectOne(`http://localhost:5000/product/${product_id}`);
    expect(req.request.method).toEqual('DELETE');

    req.flush({ 'message': 'all' });
  });

  it('should get products by category', () => {
    let category_id = 'sadasdasdasd';

    service.categoryProducts(category_id).subscribe(res => {
      expect(res).toEqual({ 'message': 'all' });
    });

    const req = httpMock.expectOne(`http://localhost:5000/product/category/${category_id}`);
    expect(req.request.method).toEqual('GET');

    req.flush({ 'message': 'all' });
  });
});
