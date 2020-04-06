import { User } from './../../interfaces/user';
import { async } from '@angular/core/testing';
import { TypemovieService } from './../../services/typemovie.service';
import { MovieService } from './../../services/movie.service';
import { Views } from './../../interfaces/views';
import { ViewsService } from './../../services/views.service';
import { AuthenticationService } from './../../services/authentication.service';
import { Component, OnInit, OnDestroy } from '@angular/core';
import { Movie } from 'src/app/interfaces/movie';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-myviews',
  templateUrl: './myviews.component.html',
  styleUrls: ['./myviews.component.css']
})
export class MyviewsComponent implements OnInit, OnDestroy {
  myviews: Views[] = []
  mymovie: Movie[] = []
  MyUser: User = {};
  loading: boolean = false;
  viewObservable;
  userObservable: Subscription;
  constructor(private authser: AuthenticationService, private viewser: ViewsService, private movser: MovieService
    , private typeser: TypemovieService) {
      this.loading = true;
    //test 
      this.userObservable = this.authser.user.subscribe( u => {
        if (u) {
          this.MyUser = this.authser.MyUser;
          console.log('this.MyUser5', this.MyUser.firstname)
          this.viewObservable = this.viewser.getviewsofuser(this.MyUser.id).onSnapshot(async (querySnapshot) => {
            this.myviews = []
            let lastview: Views = {};
            await querySnapshot.forEach((doc) => {
              lastview.id = doc.id;
              lastview.movieid = doc.data()['movieid'];
              lastview.userid = doc.data()['userid'];
              this.myviews.push(lastview);
              lastview = {};
            })
            this.retriveMovie()
            console.log(this.myviews)
            console.log(this.mymovie)
          })
        }
      })
    console.log('id2: ',this.authser.MyUser.id)
  }

  ngOnInit() {
  }
  ngOnDestroy(){
    // Stop listening to changes
    this.viewObservable();
  }
  //================================= init Data Method ===================================
  retriveMovie() {
    let movies: Movie[] = []
    console.log('in retriveMovie', this.myviews)
    for (let index = 0; index < this.myviews.length; index++) {
      let movie: Movie = {}
      this.movser.getMovieById(this.myviews[index].movieid).subscribe(async (data) => {
        movie.id = data.payload.id
          movie.title = data.payload.data()['title'],
          movie.descrition = data.payload.data()['descrition'],
          movie.publishdate = new Date(data.payload.data()['publishdate']),
          movie.director = data.payload.data()['director'],
          movie.superstare = data.payload.data()['superstare'],
          movie.posterUrl = data.payload.data()['posterUrl'],
          movie.trailerUrl = data.payload.data()['trailerUrl'],
          movie.numviews = data.payload.data()['numviews'],
          movie.country = data.payload.data()['country'],
          movie.writers = data.payload.data()['writers'],
          movie.runtime = data.payload.data()['runtime'],
          movie.imgname = data.payload.data()['imgname'],
          movie.ReleaseDate = new Date(data.payload.data()['ReleaseDate']),
          await this.typeser.getTypeById(data.payload.data()['type']).subscribe(type => {
            movie.type = type.payload.data()['name']
            movies.push(movie)
            this.loading = false;
          })
      })
    }
    this.mymovie = movies
  }

}