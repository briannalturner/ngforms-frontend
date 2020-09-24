import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http'
import { Observable } from 'rxjs'


@Injectable({
    providedIn: 'root'
})

export default class DogService {

    private dogUrl: string = 'http://localhost:3000/dogs/'

    constructor(private http: HttpClient) {}
    
    // create
    createDog(dog): Observable<Object> {
        const headers = new HttpHeaders({'Content-type': 'application/json'})
        return this.http.post<Object>(this.dogUrl, dog, {headers: headers})
    }

    // read
    getDog(id): Observable<Object> {
        return this.http.get<Object>(this.dogUrl + id)
    }

    getDogs(): Observable<Object[]> {
        return this.http.get<Object[]>(this.dogUrl)
    }

    // update
    updateDog(dog) {
        const headers = new HttpHeaders({'Content-type': 'application/json'})
        const url = `${this.dogUrl}${dog.id}`

        return this.http.patch<Object>(url, dog, {headers: headers} )
    }

    // delete
    deleteDog(dog) {
        const headers = new HttpHeaders({'Content-type': 'application/json'})
        const url = `${this.dogUrl}${dog.id}`

        return this.http.delete<Object>(url, {headers: headers})
    }

};