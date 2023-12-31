import { Component, OnDestroy, OnInit } from '@angular/core';
import { ProductData } from 'src/app/models/product-model';
import { AuthService } from 'src/app/shared/services/auth.service';
import { NewProductsService } from 'src/app/shared/services/new-products.service';
import { ProductlistService } from 'src/app/shared/services/productlist.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
})
export class HomeComponent implements OnInit {
  productList: ProductData[] = [];
  newProductList: ProductData[] = [];
  unfilterdProductList: ProductData[] = [];
  constructor(
    public productlistService: ProductlistService,
    public newProductsService: NewProductsService
  ) {}
  ngOnInit(): void {
    this.newProductList = this.newProductsService.loadNewProductList();

    this.productlistService.getProductList().subscribe((res: any) => {
      this.unfilterdProductList = res;
      this.productList = this.unfilterdProductList;
    
    });
  }

  showCategory(chosenCategory: any) {
    if (chosenCategory === 'allproduct') {
      this.productList = this.unfilterdProductList;
    } else {
      this.productList = this.unfilterdProductList.filter((p) => {
        return p.category == chosenCategory;
      });
    }
  }
 
}
