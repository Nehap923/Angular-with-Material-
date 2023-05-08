import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthGuard } from './auth.guard';
import { CartPageComponent } from './cart-page/cart-page.component';
import { CheckOutComponent } from './check-out/check-out.component';
import { HomeComponent } from './home/home.component';
import { DefaultComponent } from './layout/default/default.component';
import { DashboardComponent } from './modules/dashboard/dashboard.component';
import { PostsComponent } from './modules/posts/posts.component';
import { OrderNowComponent } from './order-now/order-now.component';
import { ProductDetailComponent } from './product-detail/product-detail.component';
import { SearchComponent } from './search/search.component';
import { SellerAddProductComponent } from './seller-add-product/seller-add-product.component';
import { SellerAuthComponent } from './seller-auth/seller-auth.component';
import { SellerHomeComponent } from './seller-home/seller-home.component';
import { SellerUpdateProductComponent } from './seller-update-product/seller-update-product.component';
import { UserAuthComponent } from './user-auth/user-auth.component';

const routes: Routes = [
  { path: '', component: HomeComponent },
  { path: 'seller-auth', component: SellerAuthComponent },
  { path: 'seller-home', component: SellerHomeComponent, canActivate: [AuthGuard] },
  {path:'seller-add-product',component:SellerAddProductComponent ,canActivate: [AuthGuard]},
  {path:'seller-update-product/:id',component:SellerUpdateProductComponent ,canActivate: [AuthGuard]},
  {path:'search/:query',component:SearchComponent},
  {path:'product-details/:id',component:ProductDetailComponent},
  {path:'user-auth',component:UserAuthComponent},
  {path:'cart-page',component:CartPageComponent},
  {path:'checkOut',component:CheckOutComponent},
  {path:'orderNow',component:OrderNowComponent},
  {path:'seller-logged',
component:DefaultComponent,
children:[{
  path:'dashboard',
  component:DashboardComponent
},
{
  path:'posts',
  component:PostsComponent
},
{
  path:'add-products',
  component:SellerAddProductComponent
}
]}




];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
