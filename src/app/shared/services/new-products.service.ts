import { Injectable } from '@angular/core';
import {
  AngularFirestore,
  AngularFirestoreDocument,
} from '@angular/fire/compat/firestore';

import { AuthService } from './auth.service';
import { map } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class NewProductsService {
  constructor(
    private afs: AngularFirestore,
    private authService: AuthService
  ) {}
  loadNewProducts() {
    return this.afs
      .collection(`users/GDbSey19SoesBVd7mzWOYyf6oPB2/new-products`)
      .valueChanges()
     
  }
  addNewProduct(product: any) {
    this.afs
      .collection(`users/${this.authService.userData.uid}/new-products`)
      .add(product);
  }
}
