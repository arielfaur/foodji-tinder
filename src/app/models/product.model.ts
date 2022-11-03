export interface Category {
    id: string;
    name: string;
}

export interface Product {
    id: string;
    name: string;
    shortDescription: string;
    description: string;
    price: number;
    category: Category;
    subCategory: Category;
    imageSet: { url: string }[];
}