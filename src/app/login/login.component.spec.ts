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

  describe('INIT', () => {
    Then(() => {
      expect(component.registerLink).toEqual('/register');
    });
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

  describe('password changed', () => {
    When(() => {
      component.passwordControl.setValue(fakeValue);
    });

    describe('Given password empty ', () => {
      Given(() => {
        fakeValue = '';
      });

      Then(() => {
        expect(component.passwordControl.valid).toBeFalsy();
      });
    });

    describe('Given password less than 7 characters ', () => {
      Given(() => {
        fakeValue = '12345';
      });

      Then(() => {
        expect(component.passwordControl.valid).toBeFalsy();
      });
    });

    describe('Given password more than 8 characters ', () => {
      Given(() => {
        fakeValue = '1234566789';
      });

      Then(() => {
        expect(component.passwordControl.valid).toBeTruthy();
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
          password: '123456789'
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
