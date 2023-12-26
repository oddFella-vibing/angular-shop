import { Component, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { ProductData } from 'src/app/models/product-model';
import { NewProductsService } from 'src/app/shared/services/new-products.service';

@Component({
  selector: 'app-post-new-item',
  templateUrl: './post-new-item.component.html',
  styleUrls: ['./post-new-item.component.css'],
})
export class PostNewItemComponent {
  @ViewChild('productForm') productForm!: NgForm;
  uploaded = false;
  categories_select = [
    `men's clothing`,
    'jewelery',
    'electronics',
    `women's clothing`,
  ];
  product: ProductData = {
    id: 0,
    title: '',
    price: 0,
    category: '',
    description: '',
    image: '',
  };
  constructor(public newProductsService: NewProductsService) {}
  uploadProduct() {
    this.newProductsService.addNewProduct(this.product);
    this.uploaded = true;
    setTimeout(()=>{this.uploaded=false},2000)
  }
}
