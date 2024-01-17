import { CommonModule } from '@angular/common';
import {
  ChangeDetectionStrategy,
  Component,
  OnInit,
  inject
} from '@angular/core';
import { UsersService } from './users.service';
import { IUser } from './types/user.interface';
import { FormsModule } from '@angular/forms';

@Component({
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './users.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class UsersComponent implements OnInit {
  private usersService = inject(UsersService);

  users$ = this.usersService.useStore((state) => state.users);
  success$ = this.usersService.useStore((state) => state.success);

  loadUsers = this.usersService.getState().loadUsers;
  createUser = this.usersService.getState().createUser;

  newUser: IUser = {
    name: '',
    age: 0
  };

  ngOnInit(): void {
    this.loadUsers();
  }

  create() {
    if (this.newUser.name.length && this.newUser.age) {
      this.createUser(this.newUser);
    }
  }

  deleteUser(id: string) {
    this.usersService.deleteUser(id);
  }
}
