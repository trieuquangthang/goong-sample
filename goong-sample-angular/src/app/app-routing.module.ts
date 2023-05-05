import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { MapSampleComponent } from './map-sample/map-sample.component';
import { MarkerSampleComponent } from './marker-sample/marker-sample.component';
import { AutocompleteComponent } from './autocomplete/autocomplete.component';
import { DirectionComponent } from './direction/direction.component';

const routes: Routes = [
  { path: '', component: MapSampleComponent },
  { path: 'marker', component: MarkerSampleComponent },
  { path: 'autocomplete', component: AutocompleteComponent },
  { path: 'direction', component: DirectionComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
