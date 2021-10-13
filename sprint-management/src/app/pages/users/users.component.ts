import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
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
  user: UserModel;
  editableUserId:  number = -1;
  isAddMode: boolean;
  userForm: FormGroup;
  
  private subscriptions: Subscription[] = [];

  constructor(private userService: UsersService, private fb: FormBuilder) { }

  ngOnInit(): void {
    this.user = new UserModel();
    this.getAllUsers();
    this.createForm(this.user);
  }

  getAllUsers():void {
    const usersSubscription = this.userService.getAllUsers().subscribe(res =>{
      this.users = res;
    })
    this.subscriptions.push(usersSubscription);
  }

  ngOnDestroy(): void {
    this.subscriptions.forEach(s => s.unsubscribe());
  }

  createForm(user:UserModel) {
    this.userForm = this.fb.group({
      name: [user.name, Validators.required],
      position: [user.position, Validators.required],
    })
  }

  toEditMode(user:UserModel):void {
    this.editableUserId = user.id;
    this.user = user;
    this.createForm(user);
  }

  cancelEdit():void{
    this.editableUserId = -1;
  }

  toAddMode():void {
    this.isAddMode = true;
    this.user = new UserModel();
  }

  cancelAdd():void {
    this.isAddMode = false;
  }

  onSubmit():void{
    if(this.userForm.invalid){
      return;
    }
    const user = this.prepareUser();
    if(user.id)
      this.editUser(user);
    this.createUser(user);
  }

  prepareUser():UserModel {
    const controls = this.userForm.controls;
    const user = new UserModel();

    user.id = this.user.id;
    user.name = controls['name'].value;
    user.position = controls['position'].value;

    return user;
  }

  editUser(user:UserModel):void{
    this.userService.updateUser(user).subscribe(res => {
      this.getAllUsers();
      this.editableUserId = -1;
    })
  }

  createUser(user: UserModel) {
    this.userService.createUser(user).subscribe(res => {
      this.isAddMode = false;
      this.getAllUsers();
    })
  }

  deleteUser(user:UserModel):void{
    const deleteSubscription = this.userService.deleteUser(user.id).subscribe(res => {
      this.getAllUsers();
    });
    this.subscriptions.push(deleteSubscription);
  }

}
