import { Component, OnInit } from '@angular/core';
import { SubSink }           from 'subsink';
import { AvailabilityService } from '@cows-will-fly/state/pwa';
import { getMessaging, getToken, onMessage } from "firebase/messaging";
import { environemnt } from "../../environments/environment"
import { AngularFireMessaging } from '@angular/fire/compat/messaging';

@Component({
  selector: 'cows-will-fly-home-screen',
  templateUrl: './home-screen.component.html',
  styleUrls: ['./home-screen.component.css']
})
export class HomeScreenComponent implements OnInit {

  private _sbS = new SubSink();
  message:any = null;
  availability!:'available' | "travelled" | "unavailable";

  constructor(private _availabilityService: AvailabilityService, private _angularFireMessaging:AngularFireMessaging){
    this._angularFireMessaging.messages.subscribe(
      (_messaging: any) => {
        _messaging.onMessage = _messaging.onMessage.bind(_messaging);
        _messaging.onTokenRefresh = _messaging.onTokenRefresh.bind(_messaging);
        debugger
      }
    );

  }

  ngOnInit(): void {
    this._sbS.sink = this._availabilityService.getCurrentStatus().subscribe(res =>{
      this.availability = (res[0] as any).status
    });

    this.requestPermission();
    // this.listen();
    // this.backgroundMessage()
    // this.foregroundmessage();

    
  }

  requestPermission() {
    this._angularFireMessaging.requestToken .subscribe(res =>{
      debugger
    })
  }

  listen() {
    this._angularFireMessaging.messages.subscribe((message: any) => {
      console.log('Foreground message: ' + message)
    })
  }


  backgroundMessage() {
    this._angularFireMessaging.onBackgroundMessage((payload) => {
      console.log('Message received. ', payload);
      this.message=payload;
      debugger
    });
  }


  foregroundmessage(){
    this._angularFireMessaging.onMessage((payload)=>{
      console.log('Message received. ', payload);
      this.message=payload;
      debugger
    })
  }

  





}
