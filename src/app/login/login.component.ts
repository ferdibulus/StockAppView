import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthGuard } from '../auth.guard';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  header = false;
  navbar = false;
  constructor(private auth:AuthGuard,private router:Router) { }

  ngOnInit(): void {
  }

  login(){
    debugger;
    this.auth.setLoggedIn();
    this.router.navigate(['home']);
  }
}
