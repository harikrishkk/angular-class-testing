import { UserCredentials } from './../_types/user-credentials.type';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { Spy, createSpyFromClass } from 'jasmine-auto-spies';

import { LoginComponent } from './login.component';
import { LoginService } from './login.service';

describe('LoginComponent', () => {
  let component: LoginComponent;
  let loginServiceSpy: Spy<LoginService>;
  let fakeValue: any;
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
    fakeValue = undefined;
  });

  describe('email changed', () => {
    When(() => {
      component.loginForm.get('email').setValue(fakeValue);
    });

    describe('Given email empty ', () => {
      Given(() => {
        fakeValue = '';
      });

      Then(() => {
        expect(component.emailControl.valid).toBeFalsy();
      });
    });

    describe('Given email not valid ', () => {
      Given(() => {
        fakeValue = 'notanemail';
      });

      Then(() => {
        expect(component.emailControl.valid).toBeFalsy();
      });
    });
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

    describe('given form data is not valid, then dont pass credentials', () => {
      Given(() => {
        fakeCredentials = {
          email: '',
          password: ''
        };
        component.loginForm.setValue(fakeCredentials);
      });

      Then(() => {
        expect(loginServiceSpy.login).not.toHaveBeenCalledWith(fakeCredentials);
      });
    });
  });
});
