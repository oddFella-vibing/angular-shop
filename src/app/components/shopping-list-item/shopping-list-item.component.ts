import { Component, Input } from '@angular/core';
import { Router } from '@angular/router';
import { ProductData } from 'src/app/models/product-model';
import { AuthService } from 'src/app/shared/services/auth.service';
import { CartService } from 'src/app/shared/services/cart.service';

@Component({
  selector: 'app-shopping-list-item',
  templateUrl: './shopping-list-item.component.html',
  styleUrls: ['./shopping-list-item.component.css'],
})
export class ShoppingListItemComponent {
  @Input() product!: ProductData;
  @Input() cartServiceid!: any;
  added=false
  constructor(
    public cartService: CartService,
    public authService: AuthService,
    public route:Router
  ) {}

  addToCart() {
    this.cartService.addToCart(this.product);
   this.added=true;
   setTimeout(() => {
    this.added=false;
   }, 1000);
  }
  removeFromCart() {

    this.cartService.removeFromCart(this.cartServiceid);
  }
}
