import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Products } from 'src/data';
import { ProductService } from '../services/product.service';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.css']
})
export class SearchComponent implements OnInit{
  productDta:undefined | Products[]
  constructor(private route:ActivatedRoute,private product:ProductService){}
ngOnInit():void{
let searchValue=this.route.snapshot.paramMap.get('query')
searchValue && this.product.searchProducts(searchValue).subscribe((data)=>{
this.productDta=data
})
}
}
