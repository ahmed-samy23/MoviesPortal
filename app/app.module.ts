import { SafePipe } from './pipes/saveUrlpipe';
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { AngularFireModule } from '@angular/fire';
import { AngularFirestoreModule , FirestoreSettingsToken } from '@angular/fire/firestore';
import { AngularFireAuthModule } from '@angular/fire/auth';
import { AngularFireStorageModule } from '@angular/fire/storage';
import { MatIconModule } from '@angular/material';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LogInComponent } from './components/log-in/log-in.component';
import { RegisterComponent } from './components/register/register.component';
import { HomeComponent } from './components/home/home.component';
import { MoviedetailsComponent } from './components/moviedetails/moviedetails.component';
import { AddmovieComponent } from './components/addmovie/addmovie.component';
import { NotfoundComponent } from './components/notfound/notfound.component';
import { NavbarComponent } from './components/navbar/navbar.component';
import { FormsModule } from '@angular/forms';
import { UpdateprofileComponent } from './components/updateprofile/updateprofile.component';
import { DashboardComponent } from './components/dashboard/dashboard.component';

@NgModule({
  declarations: [
    AppComponent,
    LogInComponent,
    RegisterComponent,
    HomeComponent,
    MoviedetailsComponent,
    AddmovieComponent,
    NotfoundComponent,
    NavbarComponent,
    SafePipe,
    UpdateprofileComponent,
    DashboardComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    NgbModule,
    FormsModule,
    BrowserAnimationsModule,
    MatIconModule,
    AngularFireModule.initializeApp({
      apiKey: "AIzaSyCmEqUolVt68d4ZfeFkFW7bI4tZmXxekWg",
      authDomain: "moviesportal-75c9e.firebaseapp.com",
      databaseURL: "https://moviesportal-75c9e.firebaseio.com",
      projectId: "moviesportal-75c9e",
      storageBucket: "moviesportal-75c9e.appspot.com",
      messagingSenderId: "1095705002604",
      appId: "1:1095705002604:web:73d73b4aa26466006e8e49",
      measurementId: "G-W12RRYEX0Q"
    }),
    AngularFirestoreModule,
    AngularFireAuthModule,
    AngularFireStorageModule
  ],
  providers: [
    {provide: FirestoreSettingsToken , useValue: {}}
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
