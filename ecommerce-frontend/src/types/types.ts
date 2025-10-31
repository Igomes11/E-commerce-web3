// Caminho: ecommerce-frontend/src/types/types.ts
export type CurrentView = 'auth' | 'catalog' | 'details' | 'cart' | 'checkout' | 'history';

export interface User {
    id: number;
    email: string;
}

export interface Produto {
    id: number;
    nome: string;
    descricao: string;
    preco: number;
    estoque: number;
    imagem: string;
    categoria?: { nome: string };
}