import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore';

@Injectable({providedIn: 'root'})

export class AvailabilityService {

  constructor(private db: AngularFirestore) {
  }

  getCurrentStatus(){
    return this.db.collection('availability', ref => ref.  orderBy("date", "desc").limit(1))
                     .valueChanges();
  }

  setNewStatus(status: 'available' | 'unavailable' | 'travelled'){
    const id = this.db.createId();
    return this.db.doc(`availability/${id}`).set({
      id: id,
      status: status,
      date: new Date()
    })


  }




}