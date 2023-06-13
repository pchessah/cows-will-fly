import { Component, OnInit, inject } from "@angular/core";
import { SubSink } from "subsink";
import { AvailabilityService } from "@cows-will-fly/state/pwa";
import { getMessaging, getToken, onMessage } from "firebase/messaging";
import { environemnt } from "../../environments/environment";
import { AngularFireMessaging } from "@angular/fire/compat/messaging";
import { BehaviorSubject } from "rxjs";


@Component({
  selector: "cows-will-fly-home-screen",
  templateUrl: "./home-screen.component.html",
  styleUrls: ["./home-screen.component.css"],
})
export class HomeScreenComponent implements OnInit {
  private _sbS = new SubSink();
  message: any = null;
  availability!: "available" | "travelled" | "unavailable";
  currentMessage = new BehaviorSubject(null);


  constructor(
    private _availabilityService: AvailabilityService,
    private angularFireMessaging: AngularFireMessaging
  ) {
    this.angularFireMessaging.onMessage((message) =>{

    })
  }

  requestPermission() {

    const messaging = getMessaging();

    getToken(messaging, { vapidKey: environemnt.firebaseConfig.vapidKey }).then((currentToken) => {
      if (currentToken) {
        console.log("Hurraaa!!! we got the token.....")
        console.log(currentToken);
        // Send the token to your server and update the UI if necessary
        // ...
      } else {
        // Show permission request UI
        console.log('No registration token available. Request permission to generate one.');
        // ...
      }
    }).catch((err) => {
      console.log('An error occurred while retrieving token. ', err);
      // ...
    });

  }
  listen() {
    const messaging = getMessaging();
    onMessage(messaging, (payload) => {
      console.log('Message received. ', payload);
      this.message=payload;
    });
  }

  ngOnInit(): void {
    this._sbS.sink = this._availabilityService
      .getCurrentStatus()
      .subscribe((res) => {
        this.availability = (res[0] as any).status;
      });

      this.requestPermission()
      this.listen()
  }
}
