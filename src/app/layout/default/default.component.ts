import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-default',
  templateUrl: './default.component.html',
  styleUrls: ['./default.component.css']
})
export class DefaultComponent implements OnInit{
sideBarOpen=true;
  constructor(){}
  ngOnInit():void{}
  sideBarToggle(event:any){
    this.sideBarOpen=!this.sideBarOpen;
  }
}
