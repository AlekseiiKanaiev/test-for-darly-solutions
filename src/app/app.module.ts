import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { UserComponent } from './components/user/user.component';
import { AuthService } from './auth-firebase/_services/auth.service';
import { AuthGuard } from './auth-firebase/_guards/auth.guard';
import { AuthFirebaseModule } from './auth-firebase/auth.module';
import { AlertService } from './auth-firebase/_services/alert.service';
import { ChangePassComponent } from './components/change-pass/change-pass.component';

@NgModule({
  declarations: [
    AppComponent,
    UserComponent,
    ChangePassComponent,
  ],
  imports: [
    BrowserModule,
    AuthFirebaseModule,
    AppRoutingModule,
    FormsModule,
    ReactiveFormsModule
  ],
  providers: [
    AuthService,
    AuthGuard,
    AlertService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
