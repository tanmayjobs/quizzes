import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';
import { NavbarComponent } from './shared/navbar/navbar.component';
import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http';
import { MessageComponent } from './shared/message/message.component';
import { TokenRefreshInterceptorService } from './auth/token-expired.interceptor';

@NgModule({
  declarations: [
    AppComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    NavbarComponent,
    HttpClientModule,
    MessageComponent
  ],
  providers: [
    { provide: HTTP_INTERCEPTORS, useClass: TokenRefreshInterceptorService, multi: true }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
