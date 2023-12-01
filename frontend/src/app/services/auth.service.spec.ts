import { TestBed } from '@angular/core/testing';
import { AuthService } from './auth.service';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';

describe('AuthService', () => {
  let service: AuthService;
  let httpMock: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [AuthService]
    });
    service = TestBed.inject(AuthService);
    httpMock = TestBed.inject(HttpTestingController);
  });

  it('should create a user', () => {
    let mockUser = {
      name: 'Robinson Ngecu',
      email: 'devngecu@gmail.com',
      password: '3W!W.:srzc4r^!pP',
    };

    service.registerUser(mockUser).subscribe(res => {
      expect(res).toEqual({ 'message': 'User registered successfully' });
    });

    const req = httpMock.expectOne('http://localhost:5000/user/register');
    expect(req.request.method).toEqual('POST');
    expect(req.request.body).toEqual(mockUser);

    req.flush({ 'message': 'User registered successfully' });
  });

  it('should login a user', () => {
    let mockUser = {
      email: 'devngecu@gmail.com',
      password: '3W!W.:srzc4r^!pP',
    };

    service.login(mockUser).subscribe(res => {
      expect(res).toEqual({ 'message': 'User logged in successfully' });
    });

    const req = httpMock.expectOne('http://localhost:5000/user/login');
    expect(req.request.method).toEqual('POST');
    expect(req.request.body).toEqual(mockUser);

    req.flush({ 'message': 'User logged in successfully' });
  });

  it('should reset password', () => {
    let email = 'devngecu@gmail.com';
    let newPassword = '3W!W.:srzc4r^!pP';

    service.resetPassword(email, newPassword).subscribe(res => {
      expect(res).toEqual({ 'message': 'Successfully reset' });
    });

    const req = httpMock.expectOne('http://localhost:5000/user/resetPassword');
    expect(req.request.method).toEqual('POST');
    expect(req.request.body).toEqual({ email, new_password: newPassword });

    req.flush({ 'message': 'Successfully reset' });
  });

  afterEach(() => {
    httpMock.verify();
  });
});
