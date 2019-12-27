import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { UserComponent } from './components/user/user.component';
import { AuthService } from './auth-firebase/_services/auth.service';
import { AuthGuard } from './auth-firebase/_guards/auth.guard';
import { AuthFirebaseModule } from './auth-firebase/auth.module';
import { AlertComponent } from './components/alert/alert.component';

@NgModule({
  declarations: [
    AppComponent,
    UserComponent,
    AlertComponent,
  ],
  imports: [
    BrowserModule,
    AuthFirebaseModule,
    AppRoutingModule
  ],
  providers: [
    AuthService,
    AuthGuard
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
