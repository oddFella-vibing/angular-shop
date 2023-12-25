import { Component, OnInit } from '@angular/core';
import { ProductData } from 'src/app/models/product-model';
import { ProductlistService } from 'src/app/shared/services/productlist.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
})
export class HomeComponent implements OnInit {
  productList: ProductData[] = [];
  unfilterdProductList: ProductData[] = [];
  constructor(public productlistService: ProductlistService) {}
  ngOnInit(): void {
    this.productlistService.getProductList().subscribe((res: any) => {
      this.unfilterdProductList = res;
      this.productList = this.unfilterdProductList;
    });
  }
  showCategory(chosenCategory: any) {
    if(chosenCategory ==='allproduct'){
      this.productList = this.unfilterdProductList;
    }
    else{
      this.productList = this.unfilterdProductList.filter((p) => {
        return p.category == chosenCategory;
      });
    }
    }
   
}
