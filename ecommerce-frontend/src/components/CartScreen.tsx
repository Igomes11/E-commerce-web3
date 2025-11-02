import { Container, Row, Col, Card, ListGroup, Button, Alert, Spinner } from 'react-bootstrap';
import type { CurrentView, Produto } from '../types/types';
import { useState, useEffect } from 'react';
import axios from 'axios';

const API_URL = 'http://localhost:3000/produto';

interface CartScreenProps {
    cartItems: { productId: number; quantidade: number }[];
    onUpdateCart: (productId: number, change: number) => void;
    onChangeView: (view: CurrentView, productId?: number) => void;
}

const CartScreen: React.FC<CartScreenProps> = ({ cartItems, onUpdateCart, onChangeView }) => {
    const [products, setProducts] = useState<Produto[]>([]);
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);
    
    const productIds = cartItems.map(item => item.productId);

    useEffect(() => {
        const fetchCartProducts = async () => {
            if (productIds.length === 0) {
                setProducts([]);
                setIsLoading(false);
                return;
            }

            try {
                // Busca detalhes de cada produto no carrinho
                const productPromises = productIds.map(id => axios.get<Produto>(`${API_URL}/${id}`));
                const results = await Promise.all(productPromises);
                
                setProducts(results.map(res => res.data));
            } catch (err) {
                setError('Erro ao carregar detalhes dos produtos no carrinho.');
            } finally {
                setIsLoading(false);
            }
        };

        fetchCartProducts();
    }, [JSON.stringify(productIds), JSON.stringify(cartItems)]); 

    const calculateTotal = () => {
        return cartItems.reduce((total, cartItem) => {
            const product = products.find(p => p.id === cartItem.productId);
            return total + (product ? product.preco * cartItem.quantidade : 0);
        }, 0);
    };

    const cartTotal = calculateTotal();

    if (isLoading) {
        return (
            <Container className="text-center mt-5">
                <Spinner animation="border" variant="primary" />
                <p>Carregando carrinho...</p>
            </Container>
        );
    }
    
    if (error) {
        return (
             <Container className="mt-5">
                <Alert variant="danger">{error}</Alert>
                <Button onClick={() => onChangeView('catalog')}>Voltar ao Catálogo</Button>
            </Container>
        );
    }

    if (cartItems.length === 0) {
        return (
            <Container className="mt-5">
                <Alert variant="info">Seu carrinho está vazio.</Alert>
                <Button onClick={() => onChangeView('catalog')}>Ver Catálogo</Button>
            </Container>
        );
    }

    return (
        <Container className="my-5">
            <h2>🛒 Meu Carrinho</h2>
            <Row>
                <Col md={8}>
                    <ListGroup variant="flush">
                        {cartItems.map(cartItem => {
                            const product = products.find(p => p.id === cartItem.productId);
                            if (!product) return null;

                            return (
                                <ListGroup.Item key={cartItem.productId} className="d-flex justify-content-between align-items-center">
                                    <div>
                                        <h5 className="mb-1">{product.nome}</h5>
                                        <p className="mb-0 text-muted">
                                            R$ {product.preco.toFixed(2)} x {cartItem.quantidade} un. 
                                        </p>
                                        <p className="fw-bold">
                                            Subtotal: R$ {(product.preco * cartItem.quantidade).toFixed(2)}
                                        </p>
                                        {product.estoque <= cartItem.quantidade && (
                                            <small className="text-danger">Estoque Máximo Atingido ({product.estoque})!</small>
                                        )}
                                    </div>
                                    <div>
                                        <Button 
                                            variant="outline-secondary" 
                                            size="sm" 
                                            onClick={() => onUpdateCart(product.id, 1)}
                                            disabled={product.estoque <= cartItem.quantidade}
                                        >
                                            +
                                        </Button>
                                        <Button 
                                            variant="outline-secondary" 
                                            size="sm" 
                                            className='mx-2' 
                                            onClick={() => onUpdateCart(product.id, -1)}
                                        >
                                            -
                                        </Button>
                                        <Button 
                                            variant="danger" 
                                            size="sm" 
                                            onClick={() => onUpdateCart(product.id, -cartItem.quantidade)}
                                        >
                                            Remover
                                        </Button>
                                    </div>
                                </ListGroup.Item>
                            );
                        })}
                    </ListGroup>
                </Col>
                <Col md={4}>
                    <Card className="mt-3 mt-md-0">
                        <Card.Body>
                            <Card.Title>Resumo do Pedido</Card.Title>
                            <hr />
                            <div className="d-flex justify-content-between fw-bold fs-4">
                                <span>TOTAL:</span>
                                <span className="text-success">R$ {cartTotal.toFixed(2)}</span>
                            </div>
                            <Button 
                                variant="primary" 
                                className="w-100 mt-4"
                                onClick={() => onChangeView('checkout')}
                            >
                                Finalizar Pedido
                            </Button>
                        </Card.Body>
                    </Card>
                </Col>
            </Row>
        </Container>
    );
};

export default CartScreen;