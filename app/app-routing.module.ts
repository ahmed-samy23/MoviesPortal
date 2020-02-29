import { MoviedetailsComponent } from './components/moviedetails/moviedetails.component';
import { RegisterComponent } from './components/register/register.component';
import { NotfoundComponent } from './components/notfound/notfound.component';
import { AddmovieComponent } from './components/addmovie/addmovie.component';
import { LogInComponent } from './components/log-in/log-in.component';
import { HomeComponent } from './components/home/home.component';
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';


const routes: Routes = [
  { path: '' , component: LogInComponent},
  { path: 'home' , component:  HomeComponent},
  { path: 'addmovie' , component: AddmovieComponent},
  { path: 'register' , component: RegisterComponent},
  { path: 'moviedetails/:id' , component: MoviedetailsComponent},
  { path: '**' , component: NotfoundComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
