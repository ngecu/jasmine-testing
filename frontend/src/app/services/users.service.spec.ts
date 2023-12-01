import { TestBed } from '@angular/core/testing';
import { UsersService } from './users.service';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';

describe('UsersService', () => {
  let service: UsersService;
  let httpMock: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [UsersService]
    });
    service = TestBed.inject(UsersService);
    httpMock = TestBed.inject(HttpTestingController);
  });

  afterEach(() => {
    httpMock.verify();
  });

  it('should get all users', () => {
    service.getUsers().subscribe(res => {
      expect(res).toEqual({ 'message': 'got all' });
    });

    const req = httpMock.expectOne('http://localhost:5000/user/allUsers');
    expect(req.request.method).toEqual('GET');

    req.flush({ 'message': 'got all' });
  });

  it('should check user details', () => {
    service.checkDetails().subscribe(res => {
      expect(res).toEqual({ 'message': 'got all' });
    });

    const req = httpMock.expectOne('http://localhost:5000/user/check_user_details');
    expect(req.request.method).toEqual('GET');

    req.flush({ 'message': 'got all' });
  });

  it('should delete one user', () => {
    let user_id = 'asdasdasd';

    service.deleteUser(user_id).subscribe(res => {
      expect(res).toEqual({ 'message': 'got all' });
    });

    const req = httpMock.expectOne(`http://localhost:5000/user/${user_id}`);
    expect(req.request.method).toEqual('DELETE');

    req.flush({ 'message': 'got all' });
  });

  it('should get one user', () => {
    let user_id = 'asdasdasd';

    service.getOneUser(user_id).subscribe(res => {
      expect(res).toEqual({ 'message': 'got all' });
    });

    const req = httpMock.expectOne(`http://localhost:5000/user/${user_id}`);
    expect(req.request.method).toEqual('GET');

    req.flush({ 'message': 'got all' });
  });

});
