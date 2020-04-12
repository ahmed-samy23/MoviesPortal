import { StorageService } from './storage.service';
import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { Movie } from '../interfaces/movie';

@Injectable({
  providedIn: 'root'
})
export class MovieService {

  constructor(private DB:AngularFirestore,private storser:StorageService) {
   }
   //======================= add new movie Methods=========================================
 // to add new movie...first add poster image to storage
  addpostermovie(filename:string ,file ,metaData){
    return this.storser.Uploadimg(filename ,file ,metaData)
  }
 // secound add data of new movie with postarUrl to firstore
  addmoviedata(moviedata){
    return this.DB.collection('movie/').add(moviedata)
  }
  // ======================= Retrive movie/s Methods ======================================
  //get all movies
  getAllMovie(){
    return this.DB.collection('movie').snapshotChanges();
  }
  //get movie by id
  getMovieById(id:string){
    return this.DB.doc('movie/'+id).snapshotChanges();
  }
  // ======================= Update movie Method ==========================================
  //update movie
  updateMovie(id:string,newdata:Movie){
    return this.DB.doc('movie/'+id).update(newdata);
  }
  // ======================= Delete movie Method ==========================================
  // to add new movie...first add poster image to storage
  Deletepostermovie(filename:string){
    return this.storser.DeleteImg(filename)
  }
  //delete movie
  deleteMovie(id:string){
    return this.DB.doc('movie/'+id).delete();
  }
  // ======================= Other Method ==========================================
  increamentMovieViews(id:string,views:number){
    return this.DB.doc('movie/'+id).update({numviews : views+1})
  }
}
