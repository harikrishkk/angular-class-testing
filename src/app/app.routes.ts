import { appRoutesNames } from './app.routes.names';
import { Routes } from '@angular/router';
import { FrontComponent } from './front/front.component';
import { LlamaPageComponent } from './llama-page/llama-page.component';
import { RegistrationComponent } from './registration/registration.component';
import { LoginComponent } from './login/login.component';

export const APP_ROUTES: Routes = [
  { path: '', component: FrontComponent },
  { path: `${appRoutesNames.LLAMA_PAGE}/:id`, component: LlamaPageComponent },
  { path: `/login`, component: LoginComponent },
  { path: `/register`, component: RegistrationComponent }
];
