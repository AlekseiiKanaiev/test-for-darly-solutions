import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
// import { HomeComponent } from './components/home/home.component';
// import { LoginComponent } from './components/login/login.component';
// import { RegisterComponent } from './components/register/register.component';
import { UserComponent } from './components/user/user.component';
import { AuthGuard } from './auth-firebase/_guards/auth.guard';
import { ChangePassComponent } from './components/change-pass/change-pass.component';

// const userChild: Routes = [
//   {path: 'user/change-password', component: ChangePassComponent}
// ];

const routes: Routes = [
  // {path: '', component: HomeComponent}
  {path: '', redirectTo: 'login', pathMatch: 'full'},
  // {path: 'login', component: LoginComponent},
  // {path: 'register', component: RegisterComponent},
  {path: 'user', component: UserComponent, canActivate: [AuthGuard], pathMatch: 'full'},
  {path: 'user/change-password', component: ChangePassComponent, canActivate: [AuthGuard]},
  {path: '**', redirectTo: 'login'}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
