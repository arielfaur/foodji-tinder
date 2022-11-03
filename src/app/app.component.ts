import { ChangeDetectionStrategy, Component, OnDestroy } from '@angular/core';
import { Store, Select } from '@ngxs/store';
import { interval, Observable, Subject, switchMap, takeUntil } from 'rxjs';
import { FetchProducts, Reset, Vote } from './actions/product.actions';
import { Product } from './models/product.model';
import { ProductState } from './states/product.state';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AppComponent implements OnDestroy {
  currentProduct!: Product;
  products$!: Observable<Product[]>;
  filter: 'all' | 'food only' = 'all';

  pollApiSubscription$ = new Subject<void>();

  // selector to filter products
  // use either ProductState.getProducts or ProductState.getFoodProducts for fresh food only (filters for category 'Hauptspeisen - Mains'... but it's not always available)
  @Select(ProductState.getAllProducts) allProducts$!: Observable<Product[]>;
  @Select(ProductState.getFoodProducts) foodProducts$!: Observable<Product[]>;

  // selector for current visible product
  @Select(ProductState.getCurrentProduct) currentProduct$!: Observable<Product>;

  constructor(private store: Store) {
    this.products$ = this.allProducts$;

    // subscribe to current product selector
    this.currentProduct$.subscribe((current) => {
      this.currentProduct = current;
    });

    // poll Api endpoing every 5 seconds and tear down subscription
    interval(5000)
      .pipe(
        takeUntil(this.pollApiSubscription$),
        switchMap(() => this.store.dispatch(new FetchProducts()))
      )
      .subscribe();
  }

  stopPolling() {
    this.pollApiSubscription$.next();
    this.pollApiSubscription$.complete();
  }

  ngOnDestroy(): void {
    this.stopPolling();
  }

  // cast a positive or negative vote
  vote(vote: number) {
    this.store.dispatch(new Vote(this.currentProduct, vote));
  }

  reset() {
    this.store.dispatch(new Reset());
  }

  toggleProductType() {
    this.filter = this.filter === 'all' ? 'food only' : 'all';
    if (this.filter === 'all') {
      this.products$ = this.allProducts$;
    } else {
      this.products$ = this.foodProducts$;
    }
  }
}
