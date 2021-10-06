import {Component, OnInit} from '@angular/core';
import {ProductService} from "../../service/product.service";
import {FormControl, FormGroup} from "@angular/forms";
import {ActivatedRoute, Router} from "@angular/router";
import {Product} from "../../model/product";

@Component({
  selector: 'app-product-edit',
  templateUrl: './product-edit.component.html',
  styleUrls: ['./product-edit.component.css']
})
export class ProductEditComponent implements OnInit {
  formUpdate: FormGroup = new FormGroup({
    id: new FormControl(),
    name: new FormControl(),
    price: new FormControl(),
    description: new FormControl()
  });
  productUpdate: Product;

  constructor(private productService: ProductService,
              private activatedRoute: ActivatedRoute,
              private router: Router) {
  }

  ngOnInit(): void {
    this.productUpdate = this.productService.findById(this.activatedRoute.snapshot.params.id);
    this.formUpdate.setValue(this.productUpdate);
  }

  update() {
    this.productService.update(this.formUpdate.value);
    this.router.navigateByUrl("/product/list");
  }
}
