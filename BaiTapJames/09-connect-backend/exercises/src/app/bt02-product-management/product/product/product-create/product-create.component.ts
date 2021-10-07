import {Component, OnInit} from '@angular/core';
import {FormControl, FormGroup} from "@angular/forms";
import {Router} from "@angular/router";
import {ProductService} from "../../../service/product.service";
import {CategoryService} from "../../../service/category.service";
import {Category} from "../../../model/category";

@Component({
  selector: 'app-product-create',
  templateUrl: './product-create.component.html',
  styleUrls: ['./product-create.component.css']
})
export class ProductCreateComponent implements OnInit {
  productForm: FormGroup = new FormGroup({
    name: new FormControl(),
    price: new FormControl(),
    description: new FormControl(),
    category: new FormControl()
  });
  categories: Category[];

  constructor(private productService: ProductService,
              private categoryService: CategoryService,
              private router: Router) {
  }

  ngOnInit(): void {
    this.getAllCategory()
  }

  submit() {
    this.categoryService.findById(this.productForm.value.category).subscribe(next => {
      let category = next[0];
      const product = this.productForm.value;
      product.category = category;
      this.productService.add(product).subscribe(next => {
        this.router.navigateByUrl("/product/list");
      }, error => {
        console.log(error);
      });
    })
  }

  getAllCategory() {
    this.categoryService.getAll().subscribe(next => {
      this.categories = next;
    })
  }
}
