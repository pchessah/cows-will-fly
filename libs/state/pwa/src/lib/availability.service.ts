import { Injectable } from '@angular/core';
import { AngularFirestore, AngularFirestoreDocument } from '@angular/fire/compat/firestore';

@Injectable({providedIn: 'root'})

export class AvailabilityService {

  constructor(private db: AngularFirestore) {
  }

  getCurrentStatus(){
    return this.db.collection('availability', ref => ref.  orderBy("date", "desc").limit(1))
                     .valueChanges();
  }




}