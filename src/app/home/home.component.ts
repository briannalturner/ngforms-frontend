import { Component, OnInit } from '@angular/core';
import DogService from '../shared/dog.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  dogs: Object[];
  _dogService;

  constructor(dogService: DogService) { 
    this._dogService = dogService
  }

  ngOnInit(): void {
    this._dogService.getDogs().subscribe({
      next: dogs => {
        this.dogs = dogs
      }
    })
  }

}
