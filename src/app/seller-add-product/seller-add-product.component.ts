import { Component } from '@angular/core';
import { ProductService } from '../services/product.service';

@Component({
  selector: 'app-seller-add-product',
  templateUrl: './seller-add-product.component.html',
  styleUrls: ['./seller-add-product.component.css']
})
export class SellerAddProductComponent {
  addProductMessage:any=''
  constructor(private service:ProductService){}
products(data:any){
this.service.addProduct(data).subscribe((res)=>{
if(res){
  this.addProductMessage='Product added'
}
setTimeout(() => {
  this.addProductMessage=undefined;
}, 3000);
  console.log(res);
});
}
}
