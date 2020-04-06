import { IsloginguardService } from './guards/isloginguard.service';
import { MyviewsComponent } from './components/myviews/myviews.component';
import { UpdateprofileComponent } from './components/updateprofile/updateprofile.component';
import { MoviedetailsComponent } from './components/moviedetails/moviedetails.component';
import { RegisterComponent } from './components/register/register.component';
import { NotfoundComponent } from './components/notfound/notfound.component';
import { AddmovieComponent } from './components/addmovie/addmovie.component';
import { LogInComponent } from './components/log-in/log-in.component';
import { HomeComponent } from './components/home/home.component';
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';


const routes: Routes = [
  { path: '' , component: HomeComponent}, // not guard
  { path: 'signIn' , component:  LogInComponent ,canActivate:[IsloginguardService]}, // if log in => false to home
  { path: 'addmovie' , component: AddmovieComponent},
  { path: 'signUp' , component: RegisterComponent ,canActivate:[IsloginguardService]}, // if log in => false to home
  { path: 'moviedetails/:id' , component: MoviedetailsComponent}, // not guard
  { path: 'updateprofile/:id' , component: UpdateprofileComponent},
  { path: 'MyViews' , component: MyviewsComponent},
  { path: '**' , component: NotfoundComponent} // not guard
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
