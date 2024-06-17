import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from "./pages/home/home.component";
import { AddTaskComponent } from "./pages/add-task/add-task.component";
import {EditProfileComponent} from "./pages/edit-profile/edit-profile.component";
import {EditTaskComponent} from "./pages/edit-task/edit-task.component";
import {SignUpComponent} from "./pages/sign-up/sign-up.component";
import {LoginComponent} from "./pages/login/login.component";
import {ProfileComponent} from "./pages/profile/profile.component";

const routes: Routes = [
  {
    path: '',
    component: HomeComponent
  },{
    path:'add-task',
    component: AddTaskComponent
  }, {
    path:'edit-profile/:id',
    component: EditProfileComponent
  },
  {
    path:'edit-task/:id',
    component: EditTaskComponent
  },
  {
    path:'profile/:id',
    component: ProfileComponent
  },
  {
    path:'login',
    component: LoginComponent
  },
  {
    path:'sign-up',
    component: SignUpComponent
  }
];



@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
