import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { Router } from '@angular/router';
import { Products } from 'src/data';
import { ProductService } from '../../../services/product.service';

@Component({
  selector: 'app-head',
  templateUrl: './head.component.html',
  styleUrls: ['./head.component.css']
})
export class HeadComponent implements OnInit{
  menutype: string = 'default';
  loggedUserName: string = '';
  userName: string = '';
cartItem=0;
  serchData: undefined | Products[];
@Output() toggleSideBarForMe: EventEmitter<any> =new EventEmitter()
  constructor(private service: ProductService,private route: Router){}
  ngOnInit():void{
    this.route.events.subscribe((res: any) => {
      if (res.url) {
        if (localStorage.getItem('loggedSellerUser') && res.url.includes('seller')) {
          // console.warn('in seller area');
          //if (localStorage.getItem('loggedSellerUser')) {
            let sellerData = localStorage.getItem('loggedSellerUser');
            let sellerName = sellerData && JSON.parse(sellerData);
            // console.log(sellerName)
            this.loggedUserName = sellerName.name;
            this.menutype = 'seller';
         // }
        }else if(localStorage.getItem('userData')){
  let userStore = localStorage.getItem('userData');
  let userData = userStore && JSON.parse(userStore);
  // console.log(sellerName)
  this.userName = userData.name;
  this.menutype='user';
this.service.getCartList(userData.id)
        }  else {
          // console.warn('outside area')
          this.menutype = 'default'
        }
      }
    });

    let cartData= localStorage.getItem('localCart');
    if(cartData){
      this.cartItem=JSON.parse(cartData).length;
    }
    this.service.cartData.subscribe((items)=>{
      this.cartItem=items.length;
    })
  }
  toggleSideBar(){
    this.toggleSideBarForMe.emit();
    setTimeout(() => {
      window.dispatchEvent(
        new Event('resize')
      )
    }, 300);  
  }
  logOut() {
    localStorage.removeItem('loggedSellerUser');
    this.route.navigate(['/']);
  }
  userLogOut(){
    localStorage.removeItem('userData');
    this.route.navigate(['/user-auth']);
    this.service.cartData.emit([]);
  }
  searchValue(query: KeyboardEvent) {
    if (query) {
      let element = query.target as HTMLInputElement;
      console.log(element.value);
      this.service.searchProducts(element.value).subscribe((result) => {
        console.log(result)
        if (result.length > 5) {
          result.length = 5
        }
        this.serchData = result;
      })
    }

  }
  serchClickEvent(val: string) {
    console.warn(val);
    this.route.navigate([`search/${val}`]);
  }
  redirectToDetails(id:number){
    this.route.navigate(['/product-details/'+id]);
  }
}
