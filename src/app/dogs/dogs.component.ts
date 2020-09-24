import { Component, OnInit } from '@angular/core';
import DogService from '../shared/dog.service';
import { Router } from '@angular/router'
import swal from 'sweetalert'

@Component({
  selector: 'app-dogs',
  templateUrl: './dogs.component.html',
  styleUrls: ['./dogs.component.css']
})
export class DogsComponent implements OnInit {

  dogs: Object[];
  activeDog: Object;
  _dogService;

  constructor(private dogService: DogService, private router: Router) { 
    this._dogService = dogService
  }

  ngOnInit(): void {
    this._dogService.getDogs().subscribe({
      next: dogs => {
        this.dogs = dogs
        this.activeDog = this.dogs[0]
      }
    })
  }

  setActiveDog(dog): void {
    this.activeDog = dog
  }

  editDog(dog):void {
    this.router.navigate([`/dogs/${dog.id}/edit`])
  }

  deleteDog(dog):void {
    this._dogService.deleteDog(dog).subscribe({
      next: resp => {
        console.log(resp)
        swal('Success!', 'Dog deleted.', 'success')
        this.router.navigate(['/dogs'])
      }
    })
  }

  viewDog(dog): void {
    this.router.navigate([`/dogs/${dog.id}`])
  }

}
