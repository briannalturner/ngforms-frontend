import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router'
import DogService from '../shared/dog.service'
import { Router } from '@angular/router'
import swal from 'sweetalert'

@Component({
  selector: 'app-dog',
  templateUrl: './dog.component.html',
  styleUrls: ['./dog.component.css']
})
export class DogComponent implements OnInit {

  _dogService;
  dog: Object;

  constructor(private route: ActivatedRoute, dogService: DogService, private router: Router) {
    this._dogService = dogService
  }

  ngOnInit(): void {
    const id: number = +this.route.snapshot.paramMap.get('id')

    this._dogService.getDog(id).subscribe({
      next: dog => {
        this.dog = dog
      }
    })
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

}
