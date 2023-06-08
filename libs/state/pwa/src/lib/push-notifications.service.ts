import { Injectable } from '@angular/core';
import { AngularFireMessaging } from '@angular/fire/compat/messaging';



@Injectable({providedIn: 'root'})

export class PushNotificationsService {
  constructor(private _messagingAngular:AngularFireMessaging) { }

  requestToken(): void {
    this._messagingAngular.requestToken.subscribe({
        next: token => {
          // Upload the user FCM token to your server.
        },
        error: err => {
          console.error('Fetching FCM token failed: ', +err)
        }
    })
}

subscribeToMessages(){
  this._messagingAngular.messages.subscribe((message: any) => {
    console.log('Foreground message: ' + message)
  })
}
  
}