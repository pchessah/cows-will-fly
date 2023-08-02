import { Component, OnInit } from "@angular/core";
import { SubSink } from "subsink";
import { AvailabilityService } from "@cows-will-fly/state/pwa";
import { getMessaging, getToken, onMessage } from "firebase/messaging";
import { environemnt } from "../../environments/environment";
import { AngularFireMessaging } from "@angular/fire/compat/messaging";
import { BehaviorSubject } from "rxjs";
import { AngularFirestore } from "@angular/fire/compat/firestore";
import * as uuid from "uuid";

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
  deviceId!: string;

  constructor(
    private _availabilityService: AvailabilityService,
    private firestore: AngularFirestore,
    private angularFireMessaging: AngularFireMessaging
  ) {
    this._setDeviceId();
  }

  ngOnInit(): void {
    this._requestPermission();

    this._sbS.sink = this.angularFireMessaging.messages.subscribe(() => {
      debugger;
    });

    this._sbS.sink = this._availabilityService
      .getCurrentStatus()
      .subscribe((res) => {
        this.availability = (res[0] as any)?.status ?? "unavailable";
      });
  }

  private _setDeviceId() {
    const idInStorage = localStorage.getItem("deviceId");

    if (idInStorage) {
      this.deviceId = idInStorage;
    } else {
      const newIdToStore = uuid.v4();
      localStorage.setItem("deviceId", newIdToStore);
      this.deviceId = newIdToStore;
    }
  }

  private _storeFCMToken(userId: string, token: string): Promise<void> {
    const docRef = this.firestore.collection("tokens").doc(userId);

    return docRef.set({ token });
  }

  private _requestPermission() {
    this.angularFireMessaging.requestPermission.subscribe((res) => {
      if (res === "granted") {
        this.angularFireMessaging.getToken.subscribe((res) => {
          console.log(res);
          this._storeFCMToken(this.deviceId, res!);
          this.angularFireMessaging.messages.subscribe((message) => {
            console.log("Message received");
          });
          this.angularFireMessaging.onMessage((message) => {
            console.log("Emitted");
          });
        });
      }
    });

    const messaging = getMessaging();

    getToken(messaging, { vapidKey: environemnt.firebaseConfig.vapidKey })
      .then((currentToken) => {
        if (currentToken) {
          console.log("Hurraaa!!! we got the token.....");
          console.log(currentToken);
          this._storeFCMToken(this.deviceId, currentToken)
            .then(() => {
              console.log("FCM token stored in Firestore");
            })
            .catch((error) => {
              console.error("Error storing FCM token:", error);
            });
          // Send the token to your server and update the UI if necessary
          // ...
        } else {
          // Show permission request UI
          console.log(
            "No registration token available. Request permission to generate one."
          );
          // ...
        }
      })
      .catch((err) => {
        console.log("An error occurred while retrieving token. ", err);
        // ...
      });
  }
}
