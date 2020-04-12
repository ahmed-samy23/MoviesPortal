import { Views } from './../interfaces/views';
import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';

@Injectable({
  providedIn: 'root'
})
export class ViewsService {

  constructor(private DB: AngularFirestore) { }

  addView(userid: string, movieid: string) {
    let view: Views = {
      userid,
      movieid
    }
    return this.DB.collection('view/').add(view)
  }

  getviewsofuser(userID:string){
    return this.DB.collection('view').ref.where("userid", "==", userID);
  }

  ifviewed(userid: string, movieid: string) {
    return this.DB.collection('view').ref.where("userid", "==", userid).where("movieid", "==", movieid).get();
  }

}
