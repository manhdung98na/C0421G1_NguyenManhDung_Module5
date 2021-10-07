import {Component, OnInit} from '@angular/core';
import {Router} from "@angular/router";
import {ProductService} from "../../../service/product.service";
import {Product} from "../../../model/product";

@Component({
  selector: 'app-product-list',
  templateUrl: './product-list.component.html',
  styleUrls: ['./product-list.component.css']
})
export class ProductListComponent implements OnInit {
  products: Product[] = [];

  constructor(private productService: ProductService) {
  }

  ngOnInit(): void {
    this.productService.getAll().subscribe(next => {
      this.products = next;
    }, error => {
      console.log(error);
    })
  }


  delete(id: number | string): void {
    this.productService.delete(id).subscribe(next => {
      this.ngOnInit();
    })
  }
}
