import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { AuthService } from './auth.service';
import { map } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class CartService {
  constructor(public afs: AngularFirestore, public authService: AuthService) {}

  loadCart() {
    return this.afs
      .collection(`users/${this.authService.userData.uid}/cart`)
      .snapshotChanges()
      .pipe(
        map((actions) => {
          return actions.map((a) => {
            const data = a.payload.doc.data();
            const id = a.payload.doc.id;
            return { id, data };
          });
        })
      );
  }
  addToCart(product: any) {
    return this.afs
      .collection(`users/${this.authService.userData.uid}/cart`)
      .add(product)
      .catch((err) => alert(err));
  }
  removeFromCart(title: any) {
    this.afs
      .collection(`users/${this.authService.userData.uid}/cart`)
      .doc(title)
      .delete();
  }
}
