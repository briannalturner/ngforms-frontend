import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { ReactiveFormsModule } from '@angular/forms'

import { AppComponent } from './app.component';
import { HomeComponent } from './home/home.component';
import { SharedModule } from './shared/shared.module';
import { DogsComponent } from './dogs/dogs.component';
import { EditDogComponent } from './edit-dog/edit-dog.component';
import { DogComponent } from './dog/dog.component';

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    DogsComponent,
    EditDogComponent,
    DogComponent
  ],
  imports: [
    BrowserModule,
    RouterModule,
    RouterModule.forRoot([
      {path: 'dogs', component: DogsComponent},
      {path: 'dogs/new', component: EditDogComponent},
      {path: 'dogs/:id/edit', component: EditDogComponent},
      {path: 'dogs/:id', component: DogComponent},
      {path: '', component: HomeComponent}
    ]),
    SharedModule,
    ReactiveFormsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
