import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';
import { Products } from 'src/data';
import { ProductService } from '../services/product.service';

@Component({
  selector: 'app-seller-home',
  templateUrl: './seller-home.component.html',
  styleUrls: ['./seller-home.component.css']
})
export class SellerHomeComponent {
  productarray:undefined | Products[];
  productMessage:undefined | string;
  constructor(private srvice:ProductService){}
ngOnInit():void{
  this.productDisplayList();
}
deleteProduct(id:number){
  console.log(id);
  this.srvice.deleteProduct(id).subscribe((res)=>{
if(res){
this.productMessage=`product deleted sucessfully`;
this.productDisplayList();
}
  })
  setTimeout(() => {
    this.productMessage=undefined;

  }, 4000);
}
productDisplayList(){
  this.srvice.productList().subscribe((result)=>{
    this.productarray=result;
    console.log(result)
   });
}
}
