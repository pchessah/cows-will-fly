import { Component, OnInit } from '@angular/core';
import { Router }            from '@angular/router';

@Component({
  selector: 'app-sidebar',
  templateUrl: 'sidebar.component.html',
  styleUrls:['sidebar.component.scss']
})

export class SideBarComponent implements OnInit {
  constructor(private _router:Router) { }

  ngOnInit() { }

  goTo(url:string){
    this._router.navigateByUrl(url)
  }
}