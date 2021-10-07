import {Component, OnInit} from '@angular/core';
import {FormControl, FormGroup} from "@angular/forms";
import {ActivatedRoute, Router} from "@angular/router";
import {Product} from "../../../model/product";
import {ProductService} from "../../../service/product.service";

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
    this.productService.findById(this.activatedRoute.snapshot.params.id).subscribe(next => {
      this.productUpdate = next[0];
      this.formUpdate.setValue(this.productUpdate);
    }, error => {
      console.log(error);
    });
  }

  update() {
    this.productService.update(this.formUpdate.value).subscribe(next => {
      this.router.navigateByUrl("/product/list");
    }, error => {
      console.log(error);
    });
  }
}
