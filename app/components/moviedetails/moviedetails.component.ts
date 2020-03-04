import { AuthenticationService } from './../../services/authentication.service';
import { TypemovieService } from './../../services/typemovie.service';
import { MovieService } from './../../services/movie.service';
import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Movie } from 'src/app/interfaces/movie';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-moviedetails',
  templateUrl: './moviedetails.component.html',
  styleUrls: ['./moviedetails.component.css']
})
export class MoviedetailsComponent implements OnInit,OnDestroy {
  movieId:string='';
  mymovie:Movie = {};
  Url:any='';
  myMovieObservable:Subscription;
  constructor(private route:ActivatedRoute,private movieser:MovieService
    ,private typeser:TypemovieService,private authser:AuthenticationService) { 
    this.movieId = this.route.snapshot.paramMap.get('id')
    this.myMovieObservable = this.movieser.getMovieById(this.movieId).subscribe(data => {
        this.mymovie.title = data.payload.data()['title'],
        this.mymovie.descrition = data.payload.data()['descrition'],
        this.mymovie.publishdate = new Date(data.payload.data()['publishdate']),
        this.mymovie.director = data.payload.data()['director'],
        this.mymovie.superstare = data.payload.data()['superstare'],
        this.mymovie.posterUrl = data.payload.data()['posterUrl'],
        this.mymovie.trailerUrl = data.payload.data()['trailerUrl'],
        this.mymovie.numviews = data.payload.data()['numviews'],
        this.mymovie.country = data.payload.data()['country'],
        this.mymovie.writers = data.payload.data()['writers'],
        this.mymovie.runtime = data.payload.data()['runtime'],
        this.mymovie.ReleaseDate = new Date(data.payload.data()['ReleaseDate']),
        this.typeser.getTypeById(data.payload.data()['type']).subscribe(type => {
          this.mymovie.type = type.payload.data()['name']
        })
        console.log('this.mymovie: ',this.mymovie)
    })
  }
  ngOnInit() {
  }

  ngOnDestroy(){
    if(this.authser.MyUser.type == 2){
      this.movieser.increamentMovieViews(this.movieId,this.mymovie.numviews)
          .then(() => {
            this.myMovieObservable.unsubscribe();
            console.log('updating done and subc un')
          })
    }else{
      this.myMovieObservable.unsubscribe();
      console.log('subc un')
    }
    
  }

}
