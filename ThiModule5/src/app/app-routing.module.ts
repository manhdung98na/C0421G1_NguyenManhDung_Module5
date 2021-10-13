import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {ListComponent} from './core/list/list.component';
import {CreateComponent} from './core/create/create.component';
import {EditComponent} from './core/edit/edit.component';


const routes: Routes = [
  {path: 'module5/list', component: ListComponent},
  {path: 'module5/create', component: CreateComponent},
  {path: 'module5/edit/:id', component: EditComponent},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {
}
