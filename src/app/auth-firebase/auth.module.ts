import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AngularFireModule } from '@angular/fire';
import { AngularFirestoreModule } from '@angular/fire/firestore';
import { AngularFireStorageModule } from '@angular/fire/storage';
import { AngularFireAuthModule } from '@angular/fire/auth';
import { environment } from '../../environments/environment';

import { LoginComponent } from './components/login/login.component';
import { RegisterComponent } from './components/register/register.component';
import { AuthService } from './_services/auth.service';
import { AuthGuard } from './_guards/auth.guard';
import { AlertComponent } from './components/alert/alert.component';
import { AlertService } from './_services/alert.service';
import { ChangePassComponent } from './components/change-pass/change-pass.component';
import { EmailVerificationComponent } from './components/email-verification/email-verification.component';
import { HandlerEmailService } from './_services/handler-email.service';

const authRoutes: Routes = [
    {path: 'login', component: LoginComponent, canActivate: [AuthGuard]},
    {path: 'change-password', component: ChangePassComponent, canActivate: [AuthGuard]},
    {path: 'register', component: RegisterComponent, canActivate: [AuthGuard], pathMatch: 'full'},
    {path: 'register/email-verification', component: EmailVerificationComponent, canActivate: [AuthGuard]},
];

@NgModule({
    declarations: [
        LoginComponent,
        RegisterComponent,
        AlertComponent,
        ChangePassComponent,
        EmailVerificationComponent
    ],
    imports: [
        CommonModule,
        RouterModule.forRoot(authRoutes),
        FormsModule,
        ReactiveFormsModule,
        AngularFireModule.initializeApp(environment.firebase, 'test-for-ds'),
        AngularFirestoreModule,
        AngularFireStorageModule,
        AngularFireAuthModule,
    ],
    providers: [
        AuthService,
        AlertService,
        HandlerEmailService
    ],
    exports: [RouterModule, AlertComponent]
})
export class AuthFirebaseModule {}
