import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';

@Injectable({
  providedIn: 'root'
})
export class TypemovieService {

  constructor(private DB:AngularFirestore) {
   }

   getalltypesofmovies(){
     return this.DB.collection('typemovie').snapshotChanges();
   }
   getTypeById(id:string){
    return this.DB.doc('typemovie/'+id).snapshotChanges();
  }
}
