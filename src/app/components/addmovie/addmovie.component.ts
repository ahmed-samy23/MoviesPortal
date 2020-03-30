import { MovieService } from './../../services/movie.service';
import { StorageService } from './../../services/storage.service';
import { TypemovieService } from './../../services/typemovie.service';
import { Typemovie } from './../../interfaces/typemovie';
import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Movie } from 'src/app/interfaces/movie';

@Component({
  selector: 'app-addmovie',
  templateUrl: './addmovie.component.html',
  styleUrls: ['./addmovie.component.css']
})
export class AddmovieComponent implements OnInit {
  opcountries: Array<string>=['Egypt (EGY)','India (IN)','Turkey (TR)','USA','Other']
  typesmovie: Typemovie[] = [];
  isposter : boolean = false;
  pattern : boolean = false;
  imgfile = null;
  imgname:string = '';
  metaData = {};
  constructor(private typeser:TypemovieService
    ,private movieser:MovieService) { 
    this.typeser.getalltypesofmovies().subscribe( data => {
      this.typesmovie = data.map(d=>{
        return{
          id : d.payload.doc.id,
          name : d.payload.doc.data()['name']
        }
      })
      });
  }

  ngOnInit() {
    let date:string=new Date().toLocaleString().split(',')[0];
    console.log('now date: ',date)
  }
  ClickedAdd:boolean = false;
  addnewmovie(form:NgForm){
    this.ClickedAdd = true;
    window.alert('The add process will take a little time..please wait');
    let movdata : Movie = form.value;
    console.log('====> movdata values component');
    console.log(movdata);
    this.movieser.addpostermovie(this.imgname , this.imgfile , this.metaData)
      .then(result => {
        result.task.snapshot.ref.getDownloadURL().then( downloadURL => {
        movdata.posterUrl = downloadURL;
        let date:string=(new Date().toLocaleString().split(',')[0]) as string;
        movdata.publishdate = date;
        movdata.imgname = this.imgname;
        movdata.numviews = 1;
        console.log('dataofmovie ==> ',movdata);
        this.movieser.addmoviedata(movdata)
          .then(() => {
            form.reset();
            this.ClickedAdd = false;
            window.alert(movdata.title +' added seccusfully to MoviesPortal');
          })
          .catch(err => {
            this.ClickedAdd = false;
            window.alert('An unexpected error occurred..please try again '+ err.message);
          })
        }).catch(err => {
      console.log('ERR.. ',err)
    })
    })
  }
  
  // ==================== custom validation =====================================================
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
