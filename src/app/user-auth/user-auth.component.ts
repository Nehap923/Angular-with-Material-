import { Component, OnInit } from '@angular/core';
import { Cart, Login, Products, signUp } from 'src/data';
import { ProductService } from '../services/product.service';
import { UserAuthService } from '../services/user-auth.service';

@Component({
  selector: 'app-user-auth',
  templateUrl: './user-auth.component.html',
  styleUrls: ['./user-auth.component.css']
})
export class UserAuthComponent implements OnInit {
  isLogeedIn: boolean = false;
  constructor(private service: UserAuthService, private product: ProductService) { }
  authError: string = ''
  ngOnInit(): void {
    this.service.reloadUserData()
  }
  signUp(data: signUp) {
    this.service.userSignUp(data)
  }

  userSignIn(data: Login) {
    this.service.userSignIn(data);
    this.service.invalidUserAuth.subscribe((result) => {
      if (result) {
        this.authError = 'Please Enter valid user Details';
      } else {
        this.getLocalCartData();
      }
    })
  }
  signUPAccount() {
    this.isLogeedIn = false

  }
  signIn() {
    this.isLogeedIn = true
  }

  getLocalCartData() {
    let data = localStorage.getItem('localCart');
    let user = localStorage.getItem('userData');
    let userId = user && JSON.parse(user).id;
    if (data) {
      let cartDataList: Products[] = JSON.parse(data);
      cartDataList.forEach((product: Products, index) => {
        let cartItem: Cart = {
          ...product,
          productId: product.id,
          userId
        };
        delete cartItem.id;

        setTimeout(() => {
          this.product.addToCart(cartItem).subscribe((res) => {
            if (res) {
              console.warn(res);
            }
          })
          if (cartDataList.length === index+1) {
            localStorage.removeItem('localCart');
          }
        }, 3000);
      })
    }
    setTimeout(() => {
      this.product.getCartList(userId);
    }, 2000);
  }
}
