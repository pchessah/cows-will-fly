import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-home',
  templateUrl: './home.page.html',
  styleUrls: ['./home.page.scss']
})

export class  HomePageComponent implements OnInit {
  constructor(private _router:Router) { }

  ngOnInit() { }

  goToProducts(){
    this._router.navigateByUrl('/products');
  }
}