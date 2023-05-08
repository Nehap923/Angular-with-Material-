import { Component, OnInit } from '@angular/core';
import { AuthService } from '../services/auth.service';
import { Router } from '@angular/router'
import { signUp } from 'src/data';
@Component({
  selector: 'app-seller-auth',
  templateUrl: './seller-auth.component.html',
  styleUrls: ['./seller-auth.component.css']
})
export class SellerAuthComponent implements OnInit {
errorText:string=''
  constructor(private seller: AuthService, private route: Router) { }
  ngOnInit(): void {
    this.seller.reloadData();
  }
  isLogeedIn = false;

  signUp(data: signUp): void {
    this.seller.userSignUp(data);
  }
  sellerSignIn(data: signUp):void {
    console.warn(data);
    this.seller.sellerLogin(data);
    this.seller.authErrorTex.subscribe((err)=>{
      if(err){
        this.errorText=`Enter valid input data`;
      }
    })
  }
  signIn(): void {
    this.isLogeedIn = true
  }
  signUPAccount() {
    this.isLogeedIn = false;
  }
 
}
