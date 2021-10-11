import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {ListComponent} from './showtime/list/list.component';
import {CreateComponent} from './showtime/create/create.component';
import {EditComponent} from './showtime/edit/edit.component';


const routes: Routes = [
  {path: 'showtimes/list', component: ListComponent},
  {path: 'showtimes/create', component: CreateComponent},
  {path: 'showtimes/edit/:id', component: EditComponent},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {
}
