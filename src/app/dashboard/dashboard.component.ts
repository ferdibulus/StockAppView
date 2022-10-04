import { Component, OnInit } from '@angular/core';
import * as Stomp from "stompjs"
import * as SockJS from 'sockjs-client';
import { RmStompServiceService } from '../service/websocketService';
import { Api } from '../api/api';
import ArrayStore from 'devextreme/data/array_store';
import DataSource from 'devextreme/data/data_source';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {
  topic: string = "/topic/Products";
  stompClient: any;
  store!:ArrayStore
  dataSource!:DataSource
  constructor(private stmp:RmStompServiceService,
              private api:Api) {}

  ngOnInit() {
    this.api.getAllProducts().subscribe((response: any) => {
      this.store = new ArrayStore({
        key: "id",
        data: response,
        // Other ArrayStore properties go here
      });
      this.dataSource = new DataSource({
            reshapeOnPush: true,
            store: this.store,
            // Other ArrayStore properties go here
      });
    });

    this.stmp.consume(this.topic).subscribe(data =>{
      console.log("Data:"   + data);
      if(data.insert){
        this.addToDataSource(data);
      }else if(data.update){
        this.updateToDataSource(data);
      }else{
        this.removeFromDataSource(data);
      }

    })
  }

  addToDataSource(data:any){
    this.store.push([{
      type: "insert",
      data: data.insert
    }]);
  }

  updateToDataSource(data:any){  
    this.store.push([{
     type: "update",
     data: data.update,
     key: data.update.id
    }]);
  }

  removeFromDataSource(data:any){
    this.store.push([{
      type: "remove", 
      key: data.remove.id
    }]);
  }

  sideBarOpen = true;

  sideBarToggler() {
    this.sideBarOpen = !this.sideBarOpen;
  }

}
