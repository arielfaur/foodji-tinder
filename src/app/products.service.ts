import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError, map, Observable, throwError } from 'rxjs';
import { environment } from '../environments/environment';
import { APIResponse } from './models/api-response.model';
import { Product } from './models/product.model';

@Injectable({
  providedIn: 'root'
})
export class ProductsService {

  constructor(private httpClient: HttpClient) { }

  fetchProducts(): Observable<Product[]> {
    return this.httpClient.get<APIResponse>(environment.apiUri).pipe(
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
