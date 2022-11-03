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
export class AppComponent {
  currentProduct!: Product;

  // selector to filter for fresh food only (category 'Hauptspeisen - Mains'... not always available)
  @Select(ProductState.getProducts) products$!: Observable<Product[]>;
  
  // selector for current visible product
  @Select(ProductState.getCurrentProduct) currentProduct$!: Observable<Product>;

  constructor(private store: Store) {
    // subscribe to current product selector
    this.currentProduct$.subscribe((current) => {
      this.currentProduct = current;
    });

    setInterval(() => this.store.dispatch(new FetchProducts()), 10000);
  }

  // cast a positive or negative vote
  vote(vote: number) {
    this.store.dispatch(new Vote(this.currentProduct, vote));
  }

  reset() {
    this.store.dispatch(new Reset());
  }
}
