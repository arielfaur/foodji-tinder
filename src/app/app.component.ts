import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { Store, Select } from '@ngxs/store';
import { Observable, tap } from 'rxjs';
import { FetchProducts, Reset, Vote } from './actions/product.actions';
import { Product } from './models/product.model';
import { ProductState } from './states/product.state';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AppComponent implements OnInit {
  title = 'food-tinder';
  currentProduct!: Product;

  @Select(ProductState.getProducts) products$!: Observable<Product[]>;
  @Select(ProductState.getCurrentProduct) currentProduct$!: Observable<Product>;

  constructor(private store: Store) {


    this.fetch();
  }

  fetch() {
    this.currentProduct$.subscribe((current) => {
      this.currentProduct = current;
      console.log(current);
    });
    
    setInterval(() => this.store.dispatch(new FetchProducts()), 10000);
  }

  ngOnInit() {}

  vote(vote: number) {
    this.store.dispatch(new Vote(this.currentProduct, vote));
  }

  reset() {
    this.store.dispatch(new Reset());
  }
}
