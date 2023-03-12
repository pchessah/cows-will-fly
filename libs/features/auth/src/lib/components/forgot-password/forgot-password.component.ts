import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-forgot-password',
  templateUrl: 'forgot-password.component.html',
  styleUrls:['forgot-password.component.scss']
})

export class ForgotPasswordComponent implements OnInit {
  
  forgotPasswordForm:FormGroup;

  constructor(private _fb:FormBuilder) {
    this.forgotPasswordForm = this._fb.group({
      email: ['' , [Validators.email, Validators.required]]
    })
  }

  ngOnInit() { }

  submit() {
    if (this.forgotPasswordForm.valid) {
     // this.submitEM.emit(this.form.value);
    }
  }
}