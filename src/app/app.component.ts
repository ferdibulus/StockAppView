import { Component } from '@angular/core';
import * as Stomp from "stompjs"
import * as SockJS from 'sockjs-client';
import { RmStompServiceService } from './service/websocketService';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'stock-app-view';
  webSocketEndPoint: string = 'ws://localhost:8080/user';
  topic: string = "/topic/Products";
  stompClient: any;

  constructor(private stmp:RmStompServiceService){
    
  }

  ngOnInit() {
    this.stmp.consume(this.topic).subscribe(data =>{
      console.log("Data:"   + data)
    })
  }
}
