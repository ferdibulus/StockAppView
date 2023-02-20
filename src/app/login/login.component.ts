import { HttpClient, HttpHeaders } from '@angular/common/http';
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
  constructor(private auth:AuthGuard,private router:Router,private api:Api, private http: HttpClient) { }

  ngOnInit(): void {
  }

  login(){
    
    let body =  {"email": this.user.username.trim(),"password" : this.user.password.trim()};
    const headers = new HttpHeaders();
    try{
      this.http.post('http://localhost/Kelony/php-auth-api/login.php',body,{ headers: headers }).subscribe((resData:any) => {
         if(resData.token != null){
          localStorage.setItem("access", JSON.stringify(true));
          localStorage.setItem("token", resData.token);
          localStorage.setItem("username", this.user.username);
          this.router.navigate(['home']);
         }
       });
     }catch(e){
     }  
  }
}
