import { State, Action, StateContext, Selector } from '@ngxs/store';
import { Product } from './../models/product.model'
import { FetchProducts, Vote } from './../actions/product.actions'
import { ProductsService } from '../products.service';
import { tap } from 'rxjs';
import { Injectable } from '@angular/core';

export interface ProductStateModel {
    products: Product[];
    votes: { [name: string]: number }
}

@State<ProductStateModel>({
    name: 'products',
    defaults: {
        products: [],
        votes: {}
    }
})
@Injectable()
export class ProductState {

    constructor(private productService: ProductsService) {}

    @Selector()
    static getProducts(state: ProductStateModel) {
        return state.products
    }

    @Action(FetchProducts)
    add({getState, patchState }: StateContext<ProductStateModel>) {
        const state = getState();

        return this.productService.fetchProducts().pipe(
            tap(products => {
                patchState({
                    products: [...products]
                })
            })
        );


    }

    @Action(Vote)
    vote({getState, patchState }: StateContext<ProductStateModel>, { id }: Product) {
        const state = getState();
        patchState({
            votes: {
                ...state.votes,

            }
        })
    }

}