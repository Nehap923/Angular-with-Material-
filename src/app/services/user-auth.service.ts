import { HttpClient } from '@angular/common/http';
import { EventEmitter, Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { BehaviorSubject } from 'rxjs';
import { Login, signUp } from 'src/data';

@Injectable({
  providedIn: 'root'
})
export class UserAuthService {
invalidUserAuth =new EventEmitter<boolean>(false)
  constructor(private http: HttpClient, private route: Router) { }

  userSignUp(data: signUp) {
    this.http.post('http://localhost:3000/users', data, { observe: 'response' })
      .subscribe((res) => {
        console.log(res);
        if (res) {
          localStorage.setItem('userData', JSON.stringify(res.body));
          this.route.navigate(['/']);
        }
      })
  }
  reloadUserData() {
    if (localStorage.getItem('userData')) {
      this.route.navigate(['/'])
    }
  }
  userSignIn(data: Login) {
    this.http.get<signUp>(`http://localhost:3000/users?email=${data.email}&password=${data.password}`, { observe: 'response' })
      .subscribe((res:any) => {
        if (res && res.body?.length) {
          localStorage.setItem('userData', JSON.stringify(res.body[0]));
          this.route.navigate(['/']);
this.invalidUserAuth.emit(false);
        }else{
          this.invalidUserAuth.emit(true)
        }
      })
  }
}
