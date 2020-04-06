import { Views } from './../../interfaces/views';
import { ViewsService } from './../../services/views.service';
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
export class MoviedetailsComponent implements OnInit, OnDestroy {
  movieId: string = '';
  mymovie: Movie = {};
  Url: any = '';
  loading: boolean = false;
  myMovieObservable: Subscription;
  constructor(private route: ActivatedRoute, private movieser: MovieService
    , private typeser: TypemovieService, private authser: AuthenticationService
    , private Viewser: ViewsService) {
      this.loading = true;
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
        this.mymovie.imgname = data.payload.data()['imgname'],
        this.mymovie.ReleaseDate = new Date(data.payload.data()['ReleaseDate']),
        this.typeser.getTypeById(data.payload.data()['type']).subscribe(type => {
          this.mymovie.type = type.payload.data()['name'];
          this.loading = false;
        })
      console.log('this.mymovie: ', this.mymovie)
    })
  }
  ngOnInit() {
  }

  ngOnDestroy() {
    if (this.authser.MyUser.type !== 1) {
      let lastview: Views = {};
      let authserMyUserid: string = this.authser.MyUser.id;
      this.movieser.increamentMovieViews(this.movieId, this.mymovie.numviews)
        .then(() => {
          if (this.authser.MyUser.id) {
            let viewinj = this.Viewser
            let movieId = this.movieId
            this.Viewser.ifviewed(this.authser.MyUser.id, this.movieId)
              .then( (querySnapshot)=> {
                querySnapshot.forEach((doc)=> {
                  lastview.id = doc.id;
                  lastview.movieid = doc.data()['movieid'];
                  lastview.userid = doc.data()['userid'];
                });
                console.log('==============================================')
                console.log('querySnapshot.size', querySnapshot.size)
                console.log('==============================================')
                console.log('65');
                if (querySnapshot.size === 0) {
                  console.log('not exist so will add')
                  viewinj.addView(authserMyUserid, movieId)
                    .catch(err => console.log('err in viewadding: ', err))
                }
              })
          }

        })
    }
    this.myMovieObservable.unsubscribe();
    console.log('updating done and subc un')
  }

}
