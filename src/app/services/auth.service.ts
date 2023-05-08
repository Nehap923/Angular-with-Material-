import { EventEmitter, Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http'
import { Login, signUp } from 'src/data';
import { BehaviorSubject } from 'rxjs';
import { Router } from '@angular/router';
@Injectable({
  providedIn: 'root'
})
export class AuthService {
  isSellerLoggedIn = new BehaviorSubject<boolean>(false)
  authErrorTex = new EventEmitter(false);
  constructor(private http: HttpClient, private route: Router) { }
  userSignUp(data: signUp) {
    return this.http.post('http://localhost:3000/seller', data, { observe: 'response' })
      .subscribe((res) => {
        this.isSellerLoggedIn.next(true);
        localStorage.setItem('loggedSellerUser', JSON.stringify(res.body));
        this.route.navigate(['seller-home']);
      });
  }
  reloadData() {
    if (localStorage.getItem('loggedSellerUser')) {
      this.route.navigate(['seller-home'])
    }
  }
  sellerLogin(data: Login) {
    this.http.get(`http://localhost:3000/seller?email=${data.email}&password=${data.password}`, { observe: 'response' })
      .subscribe((res: any) => {
        console.warn(res);
        if (res && res.body && res.body.length) {
          console.warn('user Logged In');
          localStorage.setItem('loggedSellerUser', JSON.stringify(res.body));
          this.route.navigate(['seller-logged']);
        } else {
          console.warn('user Logged In Failed');
          this.authErrorTex.emit(true)
        }
      })
  }
}
