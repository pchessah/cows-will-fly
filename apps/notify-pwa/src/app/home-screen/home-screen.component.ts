import { Component, OnInit } from '@angular/core';
import { SubSink }           from 'subsink';
import { AvailabilityService } from '@cows-will-fly/state/pwa';

@Component({
  selector: 'cows-will-fly-home-screen',
  templateUrl: './home-screen.component.html',
  styleUrls: ['./home-screen.component.css']
})
export class HomeScreenComponent implements OnInit {

  private _sbS = new SubSink();
  
  availability!:'available' | "travelled" | "unavailable";

  constructor(private _availabilityService: AvailabilityService){

  }

  ngOnInit(): void {
    this._sbS.sink = this._availabilityService.getCurrentStatus().subscribe(res =>{
      this.availability = (res[0] as any).status
    })
    
  }



}
