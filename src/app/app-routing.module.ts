import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from "./pages/home/home.component";
import { AddTaskComponent } from "./pages/add-task/add-task.component";
import {EditProfileComponent} from "./pages/edit-profile/edit-profile.component";
import {EditTaskComponent} from "./pages/edit-task/edit-task.component";
import {RegisterComponent} from "./pages/register/register.component";
import {LoginComponent} from "./pages/login/login.component";
import {ProfileComponent} from "./pages/profile/profile.component";
import {AuthGuard} from "./guards/auth.guard";

const routes: Routes = [
  {
    path: '',
    component: HomeComponent,
    canActivate: [AuthGuard],
  },{
    path:'add-task',
    component: AddTaskComponent,
    canActivate: [AuthGuard],
  }, {
    path:'edit-profile/:id',
    component: EditProfileComponent,
    canActivate: [AuthGuard],
  },
  {
    path:'edit-task/:id',
    component: EditTaskComponent,
    canActivate: [AuthGuard],
  },
  {
    path:'profile/:id',
    component: ProfileComponent,
    canActivate: [AuthGuard],
  },
  {
    path:'login',
    component: LoginComponent
  },
  {
    path:'register',
    component: RegisterComponent
  }
];



@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
