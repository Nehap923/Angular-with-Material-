import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Cart, Products } from 'src/data';
import { ProductService } from '../services/product.service';

@Component({
  selector: 'app-product-detail',
  templateUrl: './product-detail.component.html',
  styleUrls: ['./product-detail.component.css']
})
export class ProductDetailComponent {
  productDta: undefined | Products;
  productQuantity: number = 1;
  removeCart = false;
  cartItem: undefined | Products
  constructor(private route: ActivatedRoute, private product: ProductService) { }
  ngOnInit(): void {
    let productId = this.route.snapshot.paramMap.get('id')
    productId && this.product.getProductById(productId).subscribe((data) => {
      this.productDta = data;
      console.log(this.productDta);
      let cartData = localStorage.getItem('localCart');
      if (productId && cartData) {
        let items = JSON.parse(cartData);
        items = items.filter((item: Products) => productId === item.id.toString());
        if (items.length) {
          this.removeCart = true;
        } else {
          this.removeCart = false;
        }

      }
      let user = localStorage.getItem('userData');
      if (user) {
        let userId = user && JSON.parse(user).id;
        this.product.getCartList(userId);
        this.product.cartData.subscribe((res) => {
          let item = res.filter((item: Products) => productId?.toString() === item.productId?.toString())
          if (item.length) {
            this.cartItem = item[0];
            this.removeCart = true;
          }
        })
      }
    })

  }
  handleClickEvent(val: string) {
    if (this.productQuantity < 20 && val === 'plus') {
      this.productQuantity += 1
    } else if (this.productQuantity > 1 && val === 'minus') {
      this.productQuantity -= 1
    }
  }

  addToCart() {
    if (this.productDta) {
      this.productDta.quantity = this.productQuantity;
      if (!localStorage.getItem('userData')) {
        console.warn(this.productDta);
        this.product.localAddToCart(this.productDta)
        this.removeCart = true;
      } else {
        console.log('user is logged in');
        let user = localStorage.getItem('userData');
        let userId = user && JSON.parse(user).id;
        let cartData: Cart = {
          ...this.productDta,
          userId,
          productId: this.productDta.id,
        }
        delete cartData.id;
        this.product.addToCart(cartData).subscribe((result) => {
          if (result) {
            this.product.getCartList(userId);
            this.removeCart = true;
          }
        })
      }
    }
  }
  removeToCart(productId: number) {
    if (!localStorage.getItem('userData')) {
      this.product.removeItemFromCart(productId);
    } else {
      let user = localStorage.getItem('userData');
      let userId = user && JSON.parse(user).id;
      this.cartItem && this.product.removeCart(this.cartItem.id)
        .subscribe((res) => {
          if (res) {
            this.product.getCartList(userId);
          }
        })
      this.removeCart = false;

    }
  }
}
