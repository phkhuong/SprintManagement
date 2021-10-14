import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/core/services/auth.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {

  constructor(private authService: AuthService) { }

  ngOnInit(): void {
  }

  get isAuthenticated(): boolean {
    return this.authService.isAuthenticated;
  }
  get name(): string {
    return this.authService.name;
  }

  logOut(){
    this.authService.logout();
  }

}
