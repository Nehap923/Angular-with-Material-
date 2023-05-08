import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Products } from 'src/data';
import { ProductService } from '../services/product.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  populrImages: undefined | Products[];
  trendyProducts: undefined | Products[];

  constructor(private http: ProductService,private router:Router) { }

  ngOnInit(): void {
    this.http.popularProductList().subscribe((result) => {
      this.populrImages = result;
    });
    this.http.trendyProducts().subscribe((product)=>{
this.trendyProducts=product;
    })
  }
  btnClickFn(productId:number){
//this.router.navigate(['product-details/{{product.id}}'])
this.router.navigate(['/product-details/'+productId]);

  }
}
