import { Component } from '@angular/core';
import { AngularFireMessaging } from '@angular/fire/compat/messaging';

@Component({
  selector: 'cows-will-fly-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent {
  title = 'notify-pwa';
  constructor(private angularFireMessaging: AngularFireMessaging){
    console.log("Starting");
    this.angularFireMessaging.messages.subscribe((message) => {
      console.log("Message received");
    });
  }
}
