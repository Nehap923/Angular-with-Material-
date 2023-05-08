import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Products } from 'src/data';
import { ProductService } from '../services/product.service';

@Component({
  selector: 'app-seller-update-product',
  templateUrl: './seller-update-product.component.html',
  styleUrls: ['./seller-update-product.component.css']
})
export class SellerUpdateProductComponent implements OnInit{
  productData:undefined | Products;
  sucessMessage:undefined | string=''
  constructor(private route:ActivatedRoute,private http:ProductService){ }
  ngOnInit():void{
let productId=this.route.snapshot.paramMap.get('id')
//console.log(data);
productId && this.http.getProductById(productId).subscribe((res)=>{
console.log(res,'product data')
  this.productData=res
})
  }
  submit(data:any){
    if(this.productData){
      data.id=this.productData.id;
    }
this.http.updateProductData(data).subscribe((data)=>{
  if(data){
    console.log('data',data)
this.sucessMessage='Updated sucessfully'
  }
});
setTimeout(() => {
  this.sucessMessage=undefined
}, 3000);
  }
}
