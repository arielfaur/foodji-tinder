import { State, Action, StateContext, Selector } from '@ngxs/store';
import { Product } from './../models/product.model';
import { FetchProducts, Reset, Vote } from './../actions/product.actions';
import { ProductsService } from '../products.service';
import { tap } from 'rxjs';
import { Injectable } from '@angular/core';

export interface ProductStateModel {
    products: Product[];
    votes: { [name: string]: number };
    currentProduct: Product | null;
}

@State<ProductStateModel>({
    name: 'products',
    defaults: {
        products: [],
        votes: {},
        currentProduct: null,
    },
})
@Injectable()
export class ProductState {
    constructor(private productService: ProductsService) { }

    @Selector()
    static getAllProducts(state: ProductStateModel) {
        return state.products;
    }

    @Selector()
    static getCurrentProduct(state: ProductStateModel) {
        return state.currentProduct;
    }

    @Selector()
    static getFoodProducts(state: ProductStateModel) {
        return state.products.filter(
            (p) => p.category.name === 'Hauptspeisen - Mains'
        );
    }

    /**
     * Gets products and adds only non-existing ones to the store
     */
    @Action(FetchProducts)
    add({ getState, patchState }: StateContext<ProductStateModel>) {
        const state = getState();
        return this.productService.fetchProducts().pipe(
            tap((newProducts) => {
                let products: Product[] = [];
                if (state.products.length > 0) {
                    const addProducts = newProducts.filter(
                        (np) => !state.products.some((p) => np.id === p.id)
                    );
                    products = [...addProducts, ...state.products];
                } else {
                    products = newProducts;
                }
                patchState({
                    products: [...products],
                    currentProduct: products.pop(),
                });
            })
        );
    }

    /**
     * Updates votes per product and removes the current product from the stack
     */
    @Action(Vote)
    vote(
        { getState, patchState }: StateContext<ProductStateModel>,
        { product, vote }: Vote
    ) {
        const state = getState();
        let productVotes = state.votes[product.id] || 0;
        const products = [...state.products.slice(0, -1)];
        patchState({
            products: [...products],
            currentProduct: products.pop(),
            votes: {
                ...state.votes,
                [product.id]: productVotes + vote,
            },
        });
    }

    /**
     * Resets the store
     */
    @Action(Reset)
    reset({ getState, setState }: StateContext<ProductStateModel>) {
        setState({
            products: [],
            votes: {},
            currentProduct: null,
        });
    }
}
