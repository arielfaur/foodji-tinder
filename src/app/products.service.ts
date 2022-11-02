import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError, map, Observable, throwError } from 'rxjs';
import { APIResponse } from './models/api-response.model';
import { Product } from './models/product.model';

@Injectable({
  providedIn: 'root'
})
export class ProductsService {

  readonly uri = 'https://amperoid.tenants.foodji.io/machines/4bf115ee-303a-4089-a3ea-f6e7aae0ab94'; 

  constructor(private httpClient: HttpClient) { }

  fetchProducts(): Observable<Product[]> {
    return this.httpClient.get<APIResponse>(this.uri).pipe(
      map(results => {
        if (results.status !== 'success') {
          return []
        } else {
          return results.data?.machineProducts || []
        }
      }),
      catchError(err => { 
        console.log('Error contacting the API', err);
        return throwError(() => new Error(err));
      })
    );
  }
}
