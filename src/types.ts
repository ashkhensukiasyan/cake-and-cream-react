export interface Product {
    id: number;
    name: string;
    category: 'cake' | 'cupcake' | 'baklava';
    price: number;
    image: string;
}

export interface CartItem extends Product {
    quantity: number;
}