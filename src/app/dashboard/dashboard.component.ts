import { Component, OnInit } from '@angular/core';
import * as Stomp from "stompjs"
import * as SockJS from 'sockjs-client';
import { RmStompServiceService } from '../service/websocketService';
import { Api } from '../api/api';
import ArrayStore from 'devextreme/data/array_store';
import DataSource from 'devextreme/data/data_source';
import { HttpClient, HttpHeaders } from '@angular/common/http';
//import { gridData } from '../interfaces/gridData';
import { IOlympicData } from '../interfaces/IOlympicData';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {
  topic: string = "/topic/Products";
  stompClient: any;
  store!:ArrayStore
  dataSource!:DataSource;
  statusOk:boolean=false;
  numberofChecked:number=0;
  lengthOfData:number=0;

  rowData1:any;
  rowData!: IOlympicData[];
  constructor(private stmp:RmStompServiceService,
              private api:Api,
              private http: HttpClient) {
                this.getUserRoles();
              }

  ngOnInit() {
    this.getData();
  }

  sideBarOpen = true;

  sideBarToggler() {
    this.sideBarOpen = !this.sideBarOpen;
  }

  
checkValueAndUpdateData(event: any){
  console.log(event.target.value);
  console.log(event.target.checked);
  if(event.target.checked){
    this.getUpdateData(event.target.value,"checked");
    this.numberofChecked += 1;
  }else{
    this.getUpdateData(event.target.value,"");
    this.numberofChecked -= 1;
  }

}

getUpdateData(id:number,isChecked:string){
  let token=localStorage.getItem("token");
  let body =  {"id": id,"isChecked" : isChecked};
  const headers = new HttpHeaders().set('Authorization', 'Bearer ' + token);
          try{
           this.http.put('http://localhost/Kelony/php-auth-api/updateData.php',body,{ headers: headers }).subscribe((resData:any) => {
                console.log("Update:" + resData);
            });
          }catch(e){
          }
}

getUserRoles(){
  let token=localStorage.getItem("token");
  let emailOfUser=localStorage.getItem("username")
  const headers = new HttpHeaders().set('Authorization', 'Bearer ' + token);
          try{
           this.http.get('http://localhost/Kelony/php-auth-api/getUser.php',{ headers: headers }).subscribe((resData:any) => {
              if(resData.user.filter((x: { email: string; })=>x.email==emailOfUser)[0].status === "R/W"){
                this.statusOk = true;
              }else{
                this.statusOk = false;
              }
            });
          }catch(e){
          }
}


getData(){
  let token=localStorage.getItem("token");
  const headers = new HttpHeaders().set('Authorization', 'Bearer ' + token);
          try{
           this.http.get('http://localhost/Kelony/php-auth-api/getData.php',{ headers: headers }).subscribe((resData:any) => {
              this.numberofChecked = resData.data.filter((x: { isChecked: string; })=>x.isChecked == "checked").length;
              this.lengthOfData = resData.data.length;
              this.rowData1 = resData.data;
            });
          }catch(e){
          }
}
}
