import { Injectable, inject } from '@angular/core';
import { StateCreator, ZustandBaseService } from 'ng-zustand';
import { IUser } from './types/user.interface';
import { HttpClient } from '@angular/common/http';

interface UsersState {
  users: IUser[];
  loadUsers: () => void;
  createUser: (user: IUser) => void;
  success: boolean;
}

@Injectable({
  providedIn: 'root'
})
export class UsersService extends ZustandBaseService<UsersState> {
  private http = inject(HttpClient);

  override initStore(): StateCreator<UsersState> {
    return (set, get) => ({
      users: [],
      success: true,
      loadUsers: () => {
        this.http
          .get<IUser[]>('http://localhost:3000/users')
          .subscribe((users) => {
            set({ users });
          });
      },
      createUser: (user) => {
        this.http.post<boolean>('http://localhost:3000/users', user).subscribe({
          next: (response) => {
            set({ success: response });
            get().loadUsers();
          },
          error: () => set({ success: false })
        });
      }
    });
  }

  // También se pueden crear las acciones como métodos del servicio
  // en vez de meterlos en el propio estado
  deleteUser(id: string) {
    this.http.delete<boolean>(`http://localhost:3000/users/${id}`).subscribe({
      next: (response) => {
        this.setState({ success: response });
        this.getState().loadUsers();
      },
      error: () => this.setState({ success: false })
    });
  }
}
