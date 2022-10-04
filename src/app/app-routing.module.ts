import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {RegisterComponent} from "./component/register/register.component";
import {DashboardComponent} from "./component/dashboard/dashboard.component";
import {HomepageComponent} from "./component/homepage/homepage.component";

const routes: Routes = [
  {path: '', component: HomepageComponent},
  {path: 'register', component: RegisterComponent},
  {path: 'todo', component: DashboardComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
