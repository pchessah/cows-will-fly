import { Component } from '@angular/core';

@Component({
  selector: 'cows-will-fly-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent {
  title = 'Mbao Zetu';

  privacyHasBeenClosed: boolean = false;

  constructor(){
    this._checkPrivacyStatus();

  }

  private _checkPrivacyStatus(){
    this.privacyHasBeenClosed = localStorage.getItem('privacyHasBeenClosed') == 'true';
  }

  updatePrivacyClose(){
    localStorage.setItem("privacyHasBeenClosed", "true");
    this.privacyHasBeenClosed = true;
  }


}
