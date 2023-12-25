import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class ProductlistService {
  FAKESTORE_API = 'https://fakestoreapi.com/products';

  constructor(private http: HttpClient) {}
  getProductList() {
    return this.http.get(this.FAKESTORE_API);
  }
}
