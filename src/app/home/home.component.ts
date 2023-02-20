import { DecimalPipe } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { NgModule, enableProdMode } from '@angular/core';
import { Api } from '../api/api';
import * as XLSX from 'xlsx';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {
  sideBarOpen = true;
  dataSource = [{
  }];

  isDropZoneActive = false;

  imageSource = '';

  textVisible = true;

  progressVisible = false;

  progressValue = 0;
  
  architecturesInfo:any;
  pipe: any = new DecimalPipe('en-US');

  constructor(private api:Api){
    
    this.onDropZoneEnter = this.onDropZoneEnter.bind(this);
    this.onDropZoneLeave = this.onDropZoneLeave.bind(this);
    this.onUploaded = this.onUploaded.bind(this);
    this.onProgress = this.onProgress.bind(this);
    this.onUploadStarted = this.onUploadStarted.bind(this);
  }

  onDropZoneEnter(e:any) {
    if (e.dropZoneElement.id === 'dropzone-external') { this.isDropZoneActive = true; }
  }

  onDropZoneLeave(e:any) {
    if (e.dropZoneElement.id === 'dropzone-external') { this.isDropZoneActive = false; }
  }

  onUploaded(e:any) {
    const file = e.file;
    const fileReader = new FileReader();
    fileReader.onload = () => {
      this.isDropZoneActive = false;
      this.imageSource = file.name;
    };

    fileReader.readAsBinaryString(file);
    fileReader.onload = (event) =>{
      let binaryData = event.target?.result;
      let workbook = XLSX.read(binaryData, {type: "binary"});
      workbook.SheetNames.forEach(sheet => {
        const data = XLSX.utils.sheet_to_json(workbook.Sheets[sheet],{raw: false,
          header: 0,
          dateNF: "dd.mm.yyyy hh:hh"});
        
        data.forEach((x: any)=>{
          if(x.actual == undefined){
            x.actual = null;
          }else{
            x.actual = Number(x.actual);
          }

          if(x.prediction == undefined){
            x.prediction= null;
          }else{
            x.prediction = Number(x.prediction);
          }

          if(x.EFA == undefined){
            x.EFA = null;
          }else{
            x.EFA = Number(x.EFA);
          }
        })
        this.architecturesInfo = data;
      });
    }
    this.textVisible = false;
    this.progressVisible = false;
    this.progressValue = 0;
  }

  onProgress(e:any) {
    this.progressValue = e.bytesLoaded / e.bytesTotal * 100;
  }

  onUploadStarted(e:any) {
    this.imageSource = e.file.name;
    this.progressVisible = true;
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
      text: `${arg.seriesName} years: ${arg.valueText}`,
    };
  }
  
  legendClickHandler(e:any){
    const series = e.target;
    if(series.isVisible()){
      series.hide();
    }else{
      series.show();
    }
  }

 

}
