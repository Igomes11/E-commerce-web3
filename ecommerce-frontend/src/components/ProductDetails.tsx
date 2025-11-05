import { useState, useEffect } from 'react';
import axios from 'axios';
import { formatPrice } from '../utils/format';
import { Container, Card, Button, Alert, Spinner, Row, Col, Form } from 'react-bootstrap';
import type { Produto, CurrentView } from '../types';

const API_URL = 'http://localhost:3000/produto';

interface ProductDetailsProps {
    productId: number;
    onChangeView: (view: CurrentView) => void;
    onUpdateCart: (productId: number, change: number) => void;
    currentCartItem: { productId: number; quantidade: number } | undefined;
}

const ProductDetails: React.FC<ProductDetailsProps> = ({ productId, onChangeView, onUpdateCart, currentCartItem }) => {
    const [product, setProduct] = useState<Produto | null>(null);
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);
    const [quantity, setQuantity] = useState(1);
    
    // Calcula a quantidade já no carrinho
    const currentQuantity = currentCartItem?.quantidade || 0;

    useEffect(() => {
        fetchProductDetails();
    }, [productId]);

    const fetchProductDetails = async () => {
        try {
            const response = await axios.get<Produto>(`${API_URL}/${productId}`);
            setProduct(response.data);
            setQuantity(1); // Reseta a quantidade
        } catch (err) {
            setError('Erro ao carregar detalhes do produto.');
        } finally {
            setIsLoading(false);
        }
    };
    
    const handleAddToCart = () => {
        if (product && quantity > 0 && quantity <= product.estoque) {
            onUpdateCart(product.id, quantity);
            // Mensagem de sucesso simples
            alert(`Adicionado ${quantity}x ${product.nome} ao carrinho!`);
            setQuantity(1); // Reseta
        } else if (product && quantity > product.estoque) {
             alert(`Erro: A quantidade excede o estoque disponível de ${product.estoque}.`);
        }
    };
    
    const handleRemoveFromCart = () => {
        if (product && currentQuantity > 0) {
            onUpdateCart(product.id, -currentQuantity);
            alert(`Removido ${product.nome} totalmente do carrinho.`);
        }
    }

    if (isLoading) {
        return (
            <Container className="text-center mt-5"><Spinner animation="border" variant="primary" /><p className="mt-2">Carregando detalhes...</p></Container>
        );
    }

    if (error || !product) {
        return (
            <Container className="mt-5">
                <Alert variant="danger">{error || 'Detalhes do produto não encontrados.'}</Alert>
                <Button onClick={() => onChangeView('catalog')}>Voltar ao Catálogo</Button>
            </Container>
        );
    }

    return (
        <Container className="my-5">
            <Row>
                <Col md={12} className="mb-4">
                    <Button variant="outline-secondary" onClick={() => onChangeView('catalog')}>
                        ← Voltar ao Catálogo
                    </Button>
                </Col>
            </Row>
            <Card className="shadow-lg">
                <Card.Body>
                    <Row>
                        <Col md={5}>
                            <img
                                src={`https://placehold.co/600x400?text=${product.nome.substring(0, 15)}`}
                                alt={product.nome}
                                className="img-fluid rounded"
                            />
                        </Col>
                        <Col md={7}>
                            <Card.Title as="h1" className="text-primary">{product.nome}</Card.Title>
                            <h2 className="text-success mb-4">R$ {formatPrice(product.preco)}</h2>

                            <p className="text-muted">
                                **Categoria:** {product.categoria?.nome || 'N/A'}
                            </p>
                            <p className="lead">{product.descricao}</p>

                            <hr />

                            <p className={`fw-bold ${product.estoque > 5 ? 'text-success' : 'text-danger'}`}>
                                Disponível em Estoque: {product.estoque}
                            </p>
                            
                            {currentQuantity > 0 && (
                                <Alert variant="info" className="p-2 text-center">
                                    {currentQuantity} item(s) deste produto já estão no seu carrinho.
                                </Alert>
                            )}

                            <div className="d-flex align-items-center mt-4">
                                <Form.Control
                                    type="number"
                                    min="1"
                                    max={product.estoque - currentQuantity} // Limita a quantidade pelo estoque restante
                                    value={quantity}
                                    onChange={(e) => setQuantity(Math.max(1, parseInt(e.target.value) || 1))}
                                    style={{ width: '80px' }}
                                    className="me-3"
                                    disabled={product.estoque === 0 || product.estoque === currentQuantity}
                                />
                                
                                <Button 
                                    variant="primary" 
                                    onClick={handleAddToCart}
                                    disabled={product.estoque === 0 || quantity > (product.estoque - currentQuantity)}
                                    className="me-2"
                                >
                                    Adicionar ao Carrinho
                                </Button>
                                
                                {currentQuantity > 0 && (
                                    <Button 
                                        variant="outline-danger" 
                                        onClick={handleRemoveFromCart}
                                    >
                                        Remover Tudo
                                    </Button>
                                )}
                            </div>
                            
                            {product.estoque === 0 && <Alert variant="danger" className='mt-3'>Produto Esgotado!</Alert>}
                        </Col>
                    </Row>
                </Card.Body>
            </Card>
        </Container>
    );
};

export default ProductDetails;