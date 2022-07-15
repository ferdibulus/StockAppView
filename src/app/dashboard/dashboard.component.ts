import { Component, OnInit } from '@angular/core';
import * as Stomp from "stompjs"
import * as SockJS from 'sockjs-client';
import { RmStompServiceService } from '../service/websocketService';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {
  topic: string = "/topic/Products";
  stompClient: any;
  products= [{}];
  
  constructor(private stmp:RmStompServiceService) { }

  ngOnInit() {
    this.stmp.consume(this.topic).subscribe(data =>{
      console.log("Data:"   + data);
      this.products = data;
    })
  }

  sideBarOpen = true;

  sideBarToggler() {
    this.sideBarOpen = !this.sideBarOpen;
  }

}
