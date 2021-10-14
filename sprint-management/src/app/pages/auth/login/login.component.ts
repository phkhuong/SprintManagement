import { Component, OnInit } from '@angular/core';
import { FormGroup, NgForm } from '@angular/forms';
import { Subscription } from 'rxjs';
import { AuthService } from 'src/app/core/services/auth.service';
import { Credential } from 'src/app/core/models/credentials';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  private subscriptions: Subscription [] = [];
  userInfo: Credential = new Credential();

  constructor(private authService:AuthService) { }

  ngOnInit(): void {
  }

  onSubmit(form: NgForm){
    if(!form.invalid){
      this.authService.login(this.userInfo);
    }
  }

}
