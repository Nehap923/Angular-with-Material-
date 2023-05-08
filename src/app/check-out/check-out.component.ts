import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Cart, Orders } from 'src/data';
import { ProductService } from '../services/product.service';

@Component({
  selector: 'app-check-out',
  templateUrl: './check-out.component.html',
  styleUrls: ['./check-out.component.css']
})
export class CheckOutComponent implements OnInit{
cartData:Cart[] |undefined;
  totalPrice:undefined|number;
  sucessMsg:string|undefined;
  constructor(private service:ProductService , private router:Router){}

  ngOnInit():void{
    this.service.cartaDataList().subscribe((result)=>{
      let price=0;
      this.cartData=result;
      result.forEach((item)=>{
        if( item.quantity){
        price=price + (+item.price * + item.quantity) 
      }
      })
    
      this.totalPrice= price + (price/10) - (price/10);
      })
  }
  checkOutDetailFn(data:{email:string,adress:string,contactNo:string}){
let user=localStorage.getItem('userData');
let userId= user && JSON.parse(user).id;
let orders:Orders={
...data,
totalPrice:this.totalPrice,
userId,
id:undefined
}
this.cartData?.forEach((item)=>{
setTimeout(() => {
  item.id && this.service.deleteCartIteams(item.id)
}, 600);
})
this.service.orderNow(orders).subscribe((result)=>{
  console.warn(result);
  if(result){
    this.sucessMsg='Your Order Has Been Placed';
    setTimeout(() => {
      this.router.navigate(['orderNow']) 
      this.sucessMsg=undefined;
    }, 3000);  }
})
  }
}
