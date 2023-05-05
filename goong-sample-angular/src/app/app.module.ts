import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { MapSampleComponent } from './map-sample/map-sample.component';
import { AutocompleteComponent } from './autocomplete/autocomplete.component';
import { MarkerSampleComponent } from './marker-sample/marker-sample.component';
import { FormsModule } from '@angular/forms';
import { DirectionComponent } from './direction/direction.component';
@NgModule({
  declarations: [
    AppComponent,
    MapSampleComponent,
    AutocompleteComponent,
    MarkerSampleComponent,
    DirectionComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
