import { Injectable } from '@angular/core';
import {
  AngularFirestore,
  AngularFirestoreDocument,
} from '@angular/fire/compat/firestore';

import { AuthService } from './auth.service';
import { forkJoin, map } from 'rxjs';
import { AngularFireStorage } from '@angular/fire/compat/storage';

@Injectable({
  providedIn: 'root',
})
export class NewProductsService {
  constructor(
    private afs: AngularFirestore,
    private authService: AuthService,
    private afstorage: AngularFireStorage
  ) {}
  loadNewProducts(id: any) {
    return this.afs.collection(`users/${id}/new-products`).valueChanges();
  }

  loadNewProductList() {
    const idarray: any[] = [];
    const newProductList: any[] = [];
    this.afs
      .collection('users')
      .valueChanges()
      .subscribe((response) => {
        response.map((r: any) => idarray.push(r.uid));

        idarray.map((id: any) => {
          this.loadNewProducts(id).subscribe((res: any) => {
            res.map((r: any) => {
              newProductList.push(r);
            });
          });
        });
      });
console.log(newProductList)
    return newProductList;
  }
  addNewProduct(product: any, imageFile: any) {
    const date = new Date();
    this.afstorage.upload(`product-images/${date}`, imageFile).then((res) => {
      this.afstorage
        .ref(`product-images/${date}`)
        .getDownloadURL()
        .subscribe((url) => {
          product.image = url;
          this.afs
            .collection(`users/${this.authService.userData.uid}/new-products`)
            .add(product);
        });
    });
  }
}
