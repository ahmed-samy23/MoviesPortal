import { Movie } from './../../interfaces/movie';
import { MovieService } from './../../services/movie.service';
import { TypemovieService } from './../../services/typemovie.service';
import { Component, OnInit, OnDestroy } from '@angular/core';
import { NgbPopover } from '@ng-bootstrap/ng-bootstrap';
import { Typemovie } from 'src/app/interfaces/typemovie';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit, OnDestroy {
  IsMore: boolean = false;
  movies:Array<Movie> =[];
  listShowMovies:Movie[] = this.movies;
  typesmovie:Array<Typemovie> = [];
  typeFillter:string = '0';
  searchkey:string='';
  typeObservable:Subscription;movieObservable:Subscription;
  constructor(private typeser:TypemovieService,private movieser:MovieService) {
    this.movieObservable = this.movieser.getAllMovie().subscribe( data =>{
      this.movies = data.map(m => {
        return{
        id : m.payload.doc.id,
        title : m.payload.doc.data()['title'],
        descrition : m.payload.doc.data()['descrition'],
        type : m.payload.doc.data()['type'],
        publishdate : new Date(m.payload.doc.data()['publishdate']),
        director : m.payload.doc.data()['director'],
        superstare : m.payload.doc.data()['superstare'],
        posterUrl : m.payload.doc.data()['posterUrl'],
        trailerUrl : m.payload.doc.data()['trailerUrl'],
        numviews : m.payload.doc.data()['numviews'],
        country : m.payload.doc.data()['country'],
        writers : m.payload.doc.data()['writers'],
        runtime : m.payload.doc.data()['runtime'],
        ReleaseDate : new Date(m.payload.doc.data()['ReleaseDate'])
      }
      })
      console.log('====> data from this.movies2');
      console.log(this.movies);
    });
    this.typeObservable = this.typeser.getalltypesofmovies().subscribe( data => {
      this.typesmovie = data.map(d=>{
        return{
          id : d.payload.doc.id,
          name : d.payload.doc.data()['name']
        }
      })
      console.log('====> data from this.typesmovie');
      console.log(this.typesmovie);
      });
  }

  ngOnInit() {
    let l:string = 'Jumanji: The Next Level(2019)'
    console.log("lenghtmax: ",l.length)
  }
  ngOnDestroy(){
    this.typeObservable.unsubscribe();
    this.movieObservable.unsubscribe();
    console.log('subscription stops')
  }
  // =============== search methods =================================
  filter(e){
    this.typeFillter = e.target.value;
    this.search();
  }
  search(){
    this.listShowMovies = [];
    if (this.typeFillter == '0' && this.searchkey == '') {
      this.listShowMovies = this.movies;
    }else if (this.typeFillter != '0' && this.searchkey != ''){
      for (let index = 0; index < this.movies.length; index++) {
        if(this.movies[index].type == this.typeFillter && this.movies[index].title.includes(this.searchkey)){
          this.listShowMovies.push(this.movies[index]);
        }
      }
    }else if (this.typeFillter == '0' && this.searchkey != ''){
      for (let index = 0; index < this.movies.length; index++) {
        if(this.movies[index].title.includes(this.searchkey)){
          this.listShowMovies.push(this.movies[index]);
        }
      }
    }
    else if (this.typeFillter != '0' && this.searchkey == ''){
      for (let index = 0; index < this.movies.length; index++) {
        if(this.movies[index].type == this.typeFillter){
          this.listShowMovies.push(this.movies[index]);
        }
      }
    }
  console.log('================ this.listShowMovies ===========');
  console.log(this.listShowMovies);
  console.log('================ ================================== ===========');
  }
  
  
}
