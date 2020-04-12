import { AuthenticationService } from './../../services/authentication.service';
import { User } from './../../interfaces/user';
import { Movie } from './../../interfaces/movie';
import { MovieService } from './../../services/movie.service';
import { TypemovieService } from './../../services/typemovie.service';
import { Component, OnInit, OnDestroy } from '@angular/core';
import { Typemovie } from 'src/app/interfaces/typemovie';
import { Subscription } from 'rxjs';
import { NgbPopover } from '@ng-bootstrap/ng-bootstrap';
@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit, OnDestroy {
  IsMore: boolean = false;
  isUser: boolean = false;
  loading: boolean = false;
  MyUser: User = {};
  movies: Array<Movie> = [];
  listShowMovies: Movie[] = [];
  typesmovie: Array<Typemovie> = [];
  typeFillter: string = '0';
  searchkey: string = '';
  page = 1;
  pageSize = 9;
  collectionSize: number;
  typeObservable: Subscription; movieObservable: Subscription; userObservable: Subscription;

  constructor(private typeser: TypemovieService, private movieser: MovieService,
    private authser: AuthenticationService) {
    this.loading = true;
    this.movieObservable = this.movieser.getAllMovie().subscribe(data => {
      this.movies = data.map(m => {
        return {
          id: m.payload.doc.id,
          title: m.payload.doc.data()['title'],
          descrition: m.payload.doc.data()['descrition'],
          type: m.payload.doc.data()['type'],
          publishdate: new Date(m.payload.doc.data()['publishdate']),
          director: m.payload.doc.data()['director'],
          superstare: m.payload.doc.data()['superstare'],
          posterUrl: m.payload.doc.data()['posterUrl'],
          trailerUrl: m.payload.doc.data()['trailerUrl'],
          numviews: m.payload.doc.data()['numviews'],
          country: m.payload.doc.data()['country'],
          writers: m.payload.doc.data()['writers'],
          imgname: m.payload.doc.data()['imgname'],
          runtime: m.payload.doc.data()['runtime'],
          ReleaseDate: new Date(m.payload.doc.data()['ReleaseDate'])
        }
      })
      this.listShowMovies = this.movies;
      this.search();
    });
    this.typeObservable = this.typeser.getalltypesofmovies().subscribe(data => {
      this.typesmovie = data.map(d => {
        return {
          id: d.payload.doc.id,
          name: d.payload.doc.data()['name']
        }
      })
    });
    this.userObservable = this.authser.user.subscribe(u => {
      if (u) {
        this.isUser = true;
        this.MyUser = this.authser.MyUser;
      }
      else this.isUser = false
    })
  }

  ngOnInit() {
  }
  // =============================== search methods =================================
  filter(e) {
    this.typeFillter = e.target.value;
    this.search();
  }
  search() {
    this.loading = true;
    this.listShowMovies = [];
    if (this.typeFillter == '0' && this.searchkey == '') {
      this.listShowMovies = this.movies;
    } else if (this.typeFillter != '0' && this.searchkey != '') {
      for (let index = 0; index < this.movies.length; index++) {
        if (this.movies[index].type == this.typeFillter && this.movies[index].title.toLowerCase().includes(this.searchkey.toLowerCase())) {
          this.listShowMovies.push(this.movies[index]);
        }
      }
    } else if (this.typeFillter == '0' && this.searchkey != '') {
      for (let index = 0; index < this.movies.length; index++) {
        if (this.movies[index].title.toLowerCase().includes(this.searchkey.toLowerCase())) {
          this.listShowMovies.push(this.movies[index]);
        }
      }
    }
    else if (this.typeFillter != '0' && this.searchkey == '') {
      for (let index = 0; index < this.movies.length; index++) {
        if (this.movies[index].type == this.typeFillter) {
          this.listShowMovies.push(this.movies[index]);
        }
      }
    }
    this.listShowMovies.length === 0 ? this.collectionSize = this.listShowMovies.length + 1 : this.collectionSize = this.listShowMovies.length;
    this.loading = false;
  }
  //=============================== sortBy method ====================================
  sortBy(e){
    this.loading = true;
    let value = e.target.value;
    switch (value) {
      case '1':
        this.listShowMovies.sort(function(a, b) {
          if (a.title.toLowerCase() < b.title.toLowerCase()) {
            return -1;
          }
          if (a.title.toLowerCase() > b.title.toLowerCase()) {
            return 1;
          }
          // equal
          return 0;
        })
        break;
      case '2':
        this.listShowMovies.sort(function (a, b) {
          return a.numviews - b.numviews;
        }).reverse();
        break;
      case '3':
        this.listShowMovies.sort(function(a, b) {
          if (a.publishdate < b.publishdate) {
            return -1;
          }
          if (a.publishdate > b.publishdate) {
            return 1;
          }
          // equal
          return 0;
        }).reverse();
        break;
      default:
        break;
    }
    this.loading = false;
  }
  //=============================== delete method ====================================
  deletemovie(DMovie: Movie) {
    this.movieser.deleteMovie(DMovie.id)
      .then(() => {
        this.movieser.Deletepostermovie(DMovie.imgname);
        window.alert(DMovie.title + ' deleted successfuly')
      })
      .catch((err) => window.alert('err: '+ err.message))
  }
  //=============================== pagination bar inti ==============================
  get listofmovies() {
    return this.listShowMovies
      .map((contact) => ({ ...contact }))
      .slice((this.page - 1) * this.pageSize, (this.page - 1) * this.pageSize + this.pageSize);
  }
  //==================================================================================
  ngOnDestroy() {
    this.typeObservable.unsubscribe();
    this.movieObservable.unsubscribe();
  }

}
