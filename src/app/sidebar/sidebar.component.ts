import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.scss']
})
export class SidebarComponent {
  constructor(private router: Router) {}
  show:boolean=false;
  public logout() {
    window.location.reload();
    sessionStorage.clear();
    this.router.navigate(['/login']);
  }
}
