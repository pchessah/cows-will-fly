import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';

@Component({
  selector: 'app-login',
  templateUrl: 'login.component.html',
  styleUrls: ['login.component.scss']
})

export class LogInComponent implements OnInit {

  loginForm:FormGroup;

  constructor(private _fb:FormBuilder) {
    this.loginForm = this._fb.group({
      email: ['' , [Validators.email, Validators.required]],
      password: ['' , [ Validators.required]]
    })

  }

  ngOnInit() { }

  submit() {
    if (this.loginForm.valid) {
     // this.submitEM.emit(this.form.value);
    }
  }
}