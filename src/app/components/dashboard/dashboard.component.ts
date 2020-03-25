import { TypemovieService } from './../../services/typemovie.service';
import { MovieService } from './../../services/movie.service';
import { ActivatedRoute, Router } from '@angular/router';
import { Movie } from './../../interfaces/movie';
import { Typemovie } from './../../interfaces/typemovie';
import { Component, OnInit, OnDestroy } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit, OnDestroy {
  opcountries: Array<string>=['Egypt (EGY)','India (IN)','Turkey (TR)','USA','Other']
  typesmovie: Typemovie[] = [];
  isposter : boolean = false;
  pattern : boolean = false;
  imgfile = null;
  imgname:string = '';
  metaData = {};
  mymovie:Movie = {};
  movieId:string='';
  myMovieObservable:Subscription;typeObservable:Subscription;
  
  constructor(private route:ActivatedRoute,private movieser:MovieService
    ,private typeser:TypemovieService,private router:Router) { 
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
    this.typeObservable = this.typeser.getalltypesofmovies().subscribe( data => {
      this.typesmovie = data.map(d=>{
        return{
          id : d.payload.doc.id,
          name : d.payload.doc.data()['name']
        }
      })
      }) 
  }
  ngOnInit() {
  }
  ngOnDestroy(){
    this.typeObservable.unsubscribe();
    this.myMovieObservable.unsubscribe();
    console.log('subscription stops')
  }
  //================ update my movie ==============================
  UpdateMovie(form:NgForm){
    let values:Movie = form.value
    this.movieser.updateMovie(this.movieId,values)
    .then(() => {
      window.alert(this.mymovie.title+' updated successfully')
      this.router.navigate(['/moviedetails',this.movieId])
    })
  }
  // ================ custom validation ============================
  validtionposter(fileEvent: any){
    const file = fileEvent.target.files[0];
    const filename:string = file.name + Math.floor(100000 + Math.random() * 900000).toString();
    console.log('file_name', file.name);
    console.log('file_name', file.type);
    console.log('filename', filename);
    if(file.type == 'image/jpeg' || file.type == 'image/png'){
      this.isposter = false;
      this.imgfile = file;
      this.imgname = filename;
      this.metaData = { 'contentType': file.type };
      
  }else{
      this.isposter = true;
    }
  }
  validtiontrialurl(TrailerUrl: string){
    console.log('TrailerUrl', TrailerUrl);
    let pattern = 'https://www.youtube.com/embed/'
    if(TrailerUrl.includes(pattern) && TrailerUrl.length > pattern.length){
      this.pattern = false;
    }
      
    else{
      this.pattern = true;
    } 
    
  }

}
