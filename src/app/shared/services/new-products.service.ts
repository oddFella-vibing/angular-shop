import { Injectable } from '@angular/core';
import {
  AngularFirestore,
  AngularFirestoreDocument,
} from '@angular/fire/compat/firestore';

import { AuthService } from './auth.service';
import { forkJoin, map } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class NewProductsService {
  newProductList: any[] = [];
  idarray: any[] = [];
  constructor(
    private afs: AngularFirestore,
    private authService: AuthService
  ) {}
  loadNewProducts(id: any) {
    return this.afs.collection(`users/${id}/new-products`).valueChanges();
  }
  loadNewProductList() {
    this.afs
      .collection('users')
      .valueChanges()
      .subscribe((response) => {
        response.map((r: any) => this.idarray.push(r.uid));

        this.idarray.map((id: any) => {
          this.loadNewProducts(id).subscribe((res: any) => {
            res.map((r: any) => {
              this.newProductList.push(r);
            });
          });
        });
        
      });
    return this.newProductList;
  }
  addNewProduct(product: any) {
    this.afs
      .collection(`users/${this.authService.userData.uid}/new-products`)
      .add(product);
  }
}
