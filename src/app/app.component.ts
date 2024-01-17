import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink, RouterOutlet } from '@angular/router';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [CommonModule, RouterOutlet, RouterLink],
  template: `
    <div class="flex flex-col gap-10">
      <nav class="bg-slate-900 text-white px-10 py-4 text-xl">
        <ul class="flex gap-10">
          <li
            routerLink="/users"
            class="p-2 cursor-pointer hover:scale-105 transition-all uppercase">
            Users
          </li>
        </ul>
      </nav>
      <main class="max-w-7xl w-full m-auto">
        <router-outlet></router-outlet>
      </main>
    </div>
  `,
  styles: []
})
export class AppComponent {
  title = 'angular-template';
}
