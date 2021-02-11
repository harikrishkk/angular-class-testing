import { UserCredentials } from './../_types/user-credentials.type';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { Spy, createSpyFromClass } from 'jasmine-auto-spies';

import { LoginComponent } from './login.component';
import { LoginService } from './login.service';

describe('LoginComponent', () => {
  let component: LoginComponent;
  let loginServiceSpy: Spy<LoginService>;

  Given(() => {
    TestBed.configureTestingModule({
      providers: [
        LoginComponent,
        {
          provide: LoginService,
          useValue: createSpyFromClass(LoginService)
        }
      ]
    });
    component = TestBed.inject(LoginComponent);
    loginServiceSpy = TestBed.inject<any>(LoginService);
  });

  describe('METHOD handleLogin', () => {
    let fakeCredentials: UserCredentials;
    When(() => {
      component.handleLogin();
    });

    describe('given form data is valid, then pass credentials', () => {
      Given(() => {
        fakeCredentials = {
          email: 'someemail@example.com',
          password: '123456'
        };
        component.loginForm.setValue(fakeCredentials);
      });

      Then(() => {
        expect(loginServiceSpy.login).toHaveBeenCalledWith(fakeCredentials);
      });
    });
  });
});
