import { Component, OnInit, inject } from "@angular/core";
import { SubSink } from "subsink";
import { AvailabilityService } from "@cows-will-fly/state/pwa";
import { getMessaging, getToken, onMessage } from "firebase/messaging";
import { environemnt } from "../../environments/environment";
import { AngularFireMessaging } from "@angular/fire/compat/messaging";
import { BehaviorSubject } from "rxjs";
import { Functions } from "@angular/fire/functions";

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
  private functions: Functions = inject(Functions);

  constructor(
    private _availabilityService: AvailabilityService,
    private angularFireMessaging: AngularFireMessaging
  ) {
    this.angularFireMessaging.messages.subscribe((_messaging) => {
      debugger;
    });
  }

  requestPermission() {
    this.angularFireMessaging.requestToken.subscribe((token) => {
      console.log(token);
      debugger;
    });
  }

  receiveMessage() {
    this.angularFireMessaging.messages.subscribe((payload) => {
      console.log("new message received. ", payload);
      debugger;
    });
  }


  sendMessage(){
    this.functions
  }

  ngOnInit(): void {
    this._sbS.sink = this._availabilityService
      .getCurrentStatus()
      .subscribe((res) => {
        this.availability = (res[0] as any).status;
      });

      this.requestPermission()
      this.receiveMessage();
  }
}
