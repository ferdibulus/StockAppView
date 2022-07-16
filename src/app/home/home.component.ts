import { Component, OnInit } from '@angular/core';
import { Api } from '../api/api';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {
  sideBarOpen = true;
  dataSource = [{
  }];
  constructor(private api:Api){
  }

  sideBarToggler() {
    this.sideBarOpen = !this.sideBarOpen;
  }

  ngOnInit(): void {
    this.api.getAllProducts().subscribe((response: any) => {
      this.dataSource = response;
    });
    
  }

  onPointClick(e:any) {
    e.target.select();
  }

  customizeTooltip(arg: any) {
    return {
      text: `${arg.valueText} amount: ${arg.valueText}`
    };
  }

}
