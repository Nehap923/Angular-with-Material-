import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Cart, priceSummary } from 'src/data';
import { ProductService } from '../services/product.service';

@Component({
  selector: 'app-cart-page',
  templateUrl: './cart-page.component.html',
  styleUrls: ['./cart-page.component.css']
})
export class CartPageComponent implements OnInit {
  
  cartData:Cart[] | undefined;
priceSummary:priceSummary={
  price:0,
    delivery:0,
    discount:0,
    tax:0,
    total:0
}
constructor(private product:ProductService, private router:Router){}

ngOnInit():void{
this.loadDetails();
}
removeCart(cartId:number|undefined){
  cartId && this.product.removeCart(cartId)
  .subscribe((res) => {
  this.loadDetails();
  })}
checkOut(){
  this.router.navigate(['/checkOut'])
}
loadDetails(){
  this.product.cartaDataList().subscribe((result)=>{
    this.cartData=result;
    let price=0;
    result.forEach((item)=>{
      if( item.quantity){
      price=price + (+item.price * + item.quantity) 
    }
    })
    this.priceSummary.price=price;
    this.priceSummary.delivery=100;
    this.priceSummary.discount=price/10;
    this.priceSummary.tax=price/10;
    this.priceSummary.total= price + (price/10) - (price/10);
  if(!this.cartData.length) {
    this.router.navigate(['/'])
  }
  })
}
}
