import {Component, OnInit} from '@angular/core';
import {FormControl, FormGroup} from "@angular/forms";
import {CategoryService} from "../../../service/category.service";
import {ActivatedRoute, ParamMap} from "@angular/router";

@Component({
  selector: 'app-category-edit',
  templateUrl: './category-edit.component.html',
  styleUrls: ['./category-edit.component.css']
})
export class CategoryEditComponent implements OnInit {
  categoryForm: FormGroup = new FormGroup({
    id: new FormControl(),
    name: new FormControl(),
  });
  id: number;

  constructor(private categoryService: CategoryService,
              private activatedRoute: ActivatedRoute) {
    this.activatedRoute.paramMap.subscribe((paramMap: ParamMap) => {
      this.id = +paramMap.get('id');
      this.categoryService.findById(this.id).subscribe(next => {
        const category = next[0];
        this.categoryForm.setValue(category);
      });
    });
  }

  ngOnInit(): void {
  }

  updateCategory() {
    const category = this.categoryForm.value;
    this.categoryService.updateCategory(category).subscribe(next => {
      alert('Cập nhật thành công');
    }, error => {
      console.log(error);
    });
  }
}
