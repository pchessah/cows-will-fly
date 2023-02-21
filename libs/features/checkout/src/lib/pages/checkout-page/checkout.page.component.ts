import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-checkout',
  templateUrl: 'checkout.page.component.html',
  styleUrls: ['./checkout.page.component.scss']
})

export class CheckOutPageComponent implements OnInit {

  orderIsPending: boolean = true;

  constructor(private _router:Router) { }

  ngOnInit() { }

  goToHome(){
    this._router.navigateByUrl('/');
  }
}