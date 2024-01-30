import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-error-404',
  templateUrl: 'error404.component.html',
  styleUrls: ['./error404.component.scss']
})

export class Error404Component {

  constructor(private _router: Router) { }


  goHome(){
    this._router.navigateByUrl("/");
  }
}