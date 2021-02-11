import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { AppComponent } from './app.component';
import { FrontComponent } from './front/front.component';
import { HttpClientModule } from '@angular/common/http';
import { RouterModule } from '@angular/router';
import { LlamaPageComponent } from './llama-page/llama-page.component';
import { APP_ROUTES } from './app.routes';
import { LoginComponent } from './login/login.component';
import { ReactiveFormsModule } from '@angular/forms';

@NgModule({
  imports: [
    BrowserModule,
    HttpClientModule,
    ReactiveFormsModule,
    RouterModule.forRoot(APP_ROUTES)
  ],
  declarations: [AppComponent, FrontComponent, LlamaPageComponent, LoginComponent],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule {}
