import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router'
import swal from 'sweetalert'
import { debounceTime } from 'rxjs/operators'

import DogService from '../shared/dog.service'

@Component({
  selector: 'app-edit-dog',
  templateUrl: './edit-dog.component.html',
  styleUrls: ['./edit-dog.component.css']
})
export class EditDogComponent implements OnInit {

  dog: Object;
  _dogService;
  id: number;
  editDogForm;

  constructor(dogService: DogService, private route: ActivatedRoute, private fb: FormBuilder, private router: Router) {
    this._dogService = dogService
  }

  ngOnInit(): void {
    this.id = +this.route.snapshot.paramMap.get('id')
    if (this.id !== 0) {
      this._dogService.getDog(this.id).subscribe({
        next: dog => {
          this.dog = dog
          this.editDogForm = this.fb.group({
            name: [dog.name, [Validators.required, Validators.minLength(3), Validators.maxLength(15)]],
            age: [dog.age, [Validators.required, Validators.maxLength(2)]],
            weight: [dog.weight, [Validators.required, Validators.maxLength(3)]],
            breed: [dog.breed, [Validators.required, Validators.maxLength(20)]],
            coat: [dog.coat, [Validators.required, Validators.maxLength(10)]],
            eyes: [dog.eyes, [Validators.required, Validators.maxLength(10)]],
            image: [dog.image, [Validators.required]]
          })
        }
      })
    } else {
      this.dog = {
        id: 0,
        name: '',
        age: null,
        weight: null,
        breed: '',
        coat: '',
        eyes: '',
        image: ''
      }
      this.editDogForm = this.fb.group({
        name: ['', [Validators.required, Validators.minLength(3), Validators.maxLength(15)]],
        age: [null, [Validators.required, Validators.maxLength(2)]],
        weight: [null, [Validators.required, Validators.maxLength(3)]],
        breed: ['', [Validators.required, Validators.maxLength(20)]],
        coat: ['', [Validators.required, Validators.maxLength(10)]],
        eyes: ['', [Validators.required, Validators.maxLength(10)]],
        image: ['', [Validators.required]]
      })
    }
  }

  save(): void {
    const d = {...this.dog, ...this.editDogForm.value}
    console.log(this.dog)
    if (this.dog['id']) {
      this._dogService.updateDog(d).subscribe({
        next: dog => {
          this.dog = dog
          swal('Success!', 'Changes saved.', 'success')
          this.router.navigate([`/dogs/${dog.id}`])
        }
      })
    } else {
      this._dogService.createDog(this.editDogForm.value).subscribe({
        next: dog => {
          console.log(dog)
          swal('Success!', 'Dog saved.', 'success')
          this.router.navigate([`/dogs/${dog.id}`])
        }
      })
    }
  }
  
} 
