import { MovieService } from './movie.service';
import { Injectable } from '@angular/core';
import { AngularFireStorage } from '@angular/fire/storage';

@Injectable({
  providedIn: 'root'
})
export class StorageService {

  constructor(private DBstor:AngularFireStorage) { }

  Uploadimg(name:string,scrimg,metaData){
    return this.DBstor.upload('Imgs/'+name,scrimg,metaData);
  }
}
