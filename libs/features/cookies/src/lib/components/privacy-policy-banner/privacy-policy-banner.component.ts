import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { Router }            from '@angular/router';


@Component({
  selector: 'app-privacy-policy-banner',
  templateUrl: 'privacy-policy-banner.component.html',
  styleUrls: ['privacy-policy-banner.component.scss']
})

export class PrivacyPolicyBannerComponent implements OnInit {
  
 @Output() close: EventEmitter<any> = new EventEmitter();

  constructor(private _router:Router) { }

  ngOnInit() { }

  goToPrivacyPolicy(){
    this._router.navigateByUrl('/privacy-policy');
  }
  

}