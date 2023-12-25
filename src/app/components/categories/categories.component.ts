import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { map } from 'rxjs';
import { ProductlistService } from 'src/app/shared/services/productlist.service';

@Component({
  selector: 'app-categories',
  templateUrl: './categories.component.html',
  styleUrls: ['./categories.component.css'],
})
export class CategoriesComponent implements OnInit {
  @Output() returnCategory=new EventEmitter<string>()
  categoriestemp: any[] = [];
  categories: any[] = [];
  products: any[] = [];
  constructor(public productservice: ProductlistService) {}
  ngOnInit(): void {
    this.productservice.getProductList().subscribe((res: any) => {
      this.products = res;
      this.products.map((product) =>
        this.categoriestemp.push(product.category)
      );
      this.categories = this.categoriestemp.filter(
        (n, i) => this.categoriestemp.indexOf(n) === i
      );
    });
  }
  onChooseCategory(chosenCategory:any){
    this.returnCategory.emit(chosenCategory)
  }
  
}
