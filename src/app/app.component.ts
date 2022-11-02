import { Component, OnInit } from '@angular/core';
import { Store, Select } from '@ngxs/store';
import { Observable } from 'rxjs';
import { FetchProducts } from './actions/product.actions';
import { Product } from './models/product.model';
import { ProductState } from './states/product.state';
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  title = 'food-tinder';

  @Select(ProductState.getProducts) products$!: Observable<Product[]>;

  constructor(private store:Store) {
    this.store.dispatch(new FetchProducts());
  }

  ngOnInit(): void {
  }
}
