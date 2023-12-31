import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';

import { UserModel } from 'src/app/models/user-model';
import { AuthService } from 'src/app/shared/services/auth.service';
import { CartService } from 'src/app/shared/services/cart.service';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css'],
})
export class ProfileComponent implements OnInit, OnDestroy {
  totalCost = 0;
  user!: UserModel;
  userSub = new Subscription();
  cartItems: any[] = [];
  constructor(
    public authService: AuthService,
    public cartService: CartService
  ) {}
  ngOnInit(): void {
    this.user = this.authService.userData;
    this.userSub = this.authService.currentUser.subscribe((a) => {
      this.user = a;
      this.loadCartItems();
    });
    if (this.user) {
      this.loadCartItems();
    }
  }
  loadCartItems() {
    this.cartService.loadCart().subscribe((res: any) => {
      this.cartItems = res;
      this.totalCost = this.cartItems.reduce(
        (total, p) => (total += p.data.price),
        0
      );
    });
  }
  ngOnDestroy(): void {
    this.userSub.unsubscribe();
  }
}
