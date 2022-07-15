import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Api } from '../api/api';
import { AuthGuard } from '../auth.guard';


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  isVisible = false;
  type = 'info';
  message="Error";
  user = {
    "username" : "",
    "password" : ""
  }
  constructor(private auth:AuthGuard,private router:Router,private api:Api) { }

  ngOnInit(): void {
  }

  login(){
    this.api.saveUser(this.user).subscribe((response: any) => {
      if(response.username == null){
        this.type = 'error';
        this.message = "Username/password is incorrect or need to be approved!";
        this.isVisible = true;
      }else{
        this.auth.setLoggedIn();
        localStorage.setItem("username", response.username);
        this.router.navigate(['home']);
      }
    });
  }
}
