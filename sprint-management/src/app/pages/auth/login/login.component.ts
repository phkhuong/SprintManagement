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
  userInfo: Credential;
  loginError: string;

  constructor(private authService:AuthService) { }

  ngOnInit(): void {
    this.userInfo =  {
      username : 'admin',
      password: 'pass@123'
    };
  }

  onSubmit(form: NgForm){
    if(!form.invalid){
      this.authService.login(this.userInfo).subscribe(error => {console.log(error);this.loginError = error.error; });;
    }
  }

}
