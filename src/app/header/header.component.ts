import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
})
export class HeaderComponent implements OnInit {
  @Output() toggleSidebarForMe: EventEmitter<any> = new EventEmitter();
  username:any;
  constructor(private router: Router) {}

  ngOnInit(): void {
    this.username=localStorage.getItem("username");
  }

  toggleSidebar() {
    this.toggleSidebarForMe.emit();
  }

  logout(){
    this.router.navigate(['login']);
  }

}
