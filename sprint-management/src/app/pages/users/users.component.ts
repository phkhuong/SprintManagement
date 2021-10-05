import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { UserModel } from 'src/app/core/models/user.model';
import { UsersService } from 'src/app/state/users.service';

@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.css']
})
export class UsersComponent implements OnInit, OnDestroy {
  users: UserModel[];
  private subscriptions: Subscription[] = [];

  constructor(private userService: UsersService) { }

  ngOnInit(): void {
    const usersSubscription = this.userService.getAllUsers().subscribe(res =>{
      this.users = res;
    })
    this.subscriptions.push(usersSubscription);
  }

  ngOnDestroy(): void {
    this.subscriptions.forEach(s => s.unsubscribe());
  }
}
