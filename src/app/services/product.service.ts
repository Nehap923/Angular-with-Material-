import { EventEmitter, Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http'
import { Cart, Orders, Products } from 'src/data';
@Injectable({
  providedIn: 'root'
})
export class ProductService {
  cartData = new EventEmitter<Products[] | []>();
  constructor(private http: HttpClient) { }
  addProduct(data: Products) {
    return this.http.post('http://localhost:3000/products', data);
    // console.log("service called");
  }
  productList() {
    return this.http.get<Products[]>('http://localhost:3000/products');
    // console.log(data);
  }
  deleteProduct(id: number) {
    return this.http.delete(`http://localhost:3000/products/${id}`);
  }
  getProductById(id: string) {
    return this.http.get<Products>(`http://localhost:3000/products/${id}`);
  }
  updateProductData(product: Products) {
    return this.http.put(`http://localhost:3000/products/${product.id}`, product)
  }
  popularProductList() {
    return this.http.get<Products[]>('http://localhost:3000/products?_limit=15');
  }
  trendyProducts() {
    return this.http.get<Products[]>('http://localhost:3000/products?_limit=25');
  }
  searchProducts(query: string) {
    return this.http.get<Products[]>(`http://localhost:3000/products?q=${query}`);
  }
  localAddToCart(data: Products) {
    let cart = [];
    let localCart = localStorage.getItem('localCart');
    if (!localCart) {
      localStorage.setItem('localCart', JSON.stringify([data]));
this.cartData.emit([data]) 
   } else {
      cart = JSON.parse(localCart);
      cart.push(data);
      localStorage.setItem('localCart', JSON.stringify(cart));
      this.cartData.emit(cart);

    }
  }
  removeItemFromCart(productId: number) {
    let cartData = localStorage.getItem('localCart');
    if (cartData) {
      let items: Products[] = JSON.parse(cartData);
      items = items.filter((item: Products) => productId !== item.id)
      console.warn(items);
      localStorage.setItem('localCart', JSON.stringify(items));
      this.cartData.emit(items)
    }
  }

  addToCart(data:Cart){
    return this.http.post('http://localhost:3000/cart', data);
  }
  getCartList(userId:number){
    return this.http.get<Products[]>('http://localhost:3000/cart?userId='+userId,
    {observe:'response'}).subscribe((result)=>{
      if(result && result.body){
        this.cartData.emit(result.body)
      }
    });

  }
  removeCart(id:number){
    return this.http.delete('http://localhost:3000/cart/'+id);
  }
  cartaDataList(){
    let user = localStorage.getItem('userData');
    let userData = user && JSON.parse(user);
    return this.http.get<Cart[]>('http://localhost:3000/cart?userId'+userData.id);
  }
  orderNow(data:any){
    return this.http.post('http://localhost:3000/orders', data);
  }
  orderList(){
    let user = localStorage.getItem('userData');
    let userData = user && JSON.parse(user);
    return this.http.get<Orders[]>('http://localhost:3000/orders?userId='+userData.id);
  }
  deleteCartIteams(cartId:number){
    return this.http.delete('http://localhost:3000/cart/'+cartId,{observe:'response'}).subscribe((result)=>{
      if(result){
        this.cartData.emit([])
      }
    })
  }
  cancelOrder(orderId:number){
    return this.http.delete('http://localhost:3000/orders/'+orderId)
  }
}
