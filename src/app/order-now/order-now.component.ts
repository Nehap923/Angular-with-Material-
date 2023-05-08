import { Component, OnInit } from '@angular/core';
import { Orders } from 'src/data';
import { ProductService } from '../services/product.service';

@Component({
  selector: 'app-order-now',
  templateUrl: './order-now.component.html',
  styleUrls: ['./order-now.component.css']
})
export class OrderNowComponent implements OnInit {
  orderList:Orders[] | undefined
constructor(private service:ProductService){}
ngOnInit():void{
  this.orderListFn();
}
cancelOrder(orderid:number | undefined){
orderid && this.service.cancelOrder(orderid).subscribe((res)=>{
this.orderListFn();
})
}
orderListFn(){
  this.service.orderList().subscribe((result)=>{
    this.orderList=result
  })
}
}
