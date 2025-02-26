export interface ProductListParams{
    _id:string;
    images: [string];
    name: string;
    price: number;
    quantity: number;
    inStock?: boolean
    isFeatured?: boolean
    category?: string;
}

export interface CartItem {
  cart: ProductListParams []
  length: number;
}

export interface CartState {
    cart: {
        cart: ProductListParams []
        length: number
    }
}