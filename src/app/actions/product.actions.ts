import { Product } from "../models/product.model";

export class FetchProducts {
    static readonly type = '[PRODUCT] Fetch';
}

export class Vote {
    static readonly type = '[PRODUCT] Vote';

    constructor(public product: Product, public vote: number ) {}
}

export class Reset {
    static readonly type = '[PRODUCT] Reset';
}