// Caminho: ecommerce-frontend/src/AuthScreen.tsx
import React, { useState } from 'react';
import axios from 'axios';
import { Container, Row, Col, Card, Form, Button, Alert } from 'react-bootstrap';

// URL base do seu Backend NestJS
const API_URL = 'http://localhost:3000/cliente';

// DTO de Criação de Cliente (apenas para tipagem no frontend)
interface CreateClienteDto {
    nome: string;
    email: string;
    senha: string;
    telefone: string;
}

// DTO de Login (apenas para tipagem no frontend ilustrativo)
interface LoginDto {
    email: string;
    senha: string;
}

/**
 * Componente que gerencia as telas de Login e Cadastro.
 * O Login é ilustrativo, o Cadastro faz uma chamada real para a API.
 */
const AuthScreen: React.FC = () => {
    // -------------------------------------------------------------------------
    // ESTADOS
    // -------------------------------------------------------------------------
    const [isLoginView, setIsLoginView] = useState(true);
    const [cadastroData, setCadastroData] = useState<CreateClienteDto>({
        nome: '',
        email: '',
        senha: '',
        telefone: '',
    });
    const [loginData, setLoginData] = useState<LoginDto>({
        email: '',
        senha: '',
    });
    const [message, setMessage] = useState<{ type: 'success' | 'danger'; text: string } | null>(null);
    const [isLoading, setIsLoading] = useState(false);

    // -------------------------------------------------------------------------
    // HANDLERS
    // -------------------------------------------------------------------------

    // Manipula a mudança de dados nos inputs de Cadastro
    const handleCadastroChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setCadastroData({
            ...cadastroData,
            [e.target.name]: e.target.value,
        });
    };

    // Manipula a mudança de dados nos inputs de Login
    const handleLoginChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setLoginData({
            ...loginData,
            [e.target.name]: e.target.value,
        });
    };

    // Submissão do Formulário de CADASTRO
    const handleCadastroSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setMessage(null);
        setIsLoading(true);

        try {
            // Chamada real para a rota POST /cliente do Backend NestJS
            const response = await axios.post<CreateClienteDto>(API_URL, cadastroData);
            
            setMessage({
                type: 'success',
                text: `Cadastro realizado com sucesso! Cliente: ${response.data.nome}. Você pode tentar o login ilustrativo agora.`,
            });
            setCadastroData({ nome: '', email: '', senha: '', telefone: '' });
            setIsLoginView(true); // Após cadastro, volta para a tela de login
        } catch (error) {
            let errorMsg = 'Erro ao cadastrar. Tente novamente.';
            if (axios.isAxiosError(error) && error.response?.data?.message) {
                // Mensagem de erro do NestJS (ex: email duplicado)
                errorMsg = Array.isArray(error.response.data.message) 
                    ? error.response.data.message[0] 
                    : error.response.data.message;
            }
            setMessage({ type: 'danger', text: errorMsg });
        } finally {
            setIsLoading(false);
        }
    };

    // Submissão do Formulário de LOGIN (ILUSTRATIVO)
    const handleLoginSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        setMessage(null);
        setIsLoading(true);

        // --- LÓGICA DE LOGIN ILUSTRATIVA ---
        
        if (loginData.email && loginData.senha) {
            setMessage({
                type: 'success',
                text: `Login ilustrativo bem-sucedido para ${loginData.email}! Navegando para o Catálogo... (Próxima Fase do Projeto)`,
            });
            // Em um app real, aqui faríamos um Redirect para a home/catálogo
            setLoginData({ email: '', senha: '' });
        } else {
            setMessage({ type: 'danger', text: 'Preencha todos os campos.' });
        }
        
        setTimeout(() => setIsLoading(false), 500);
    };

    // -------------------------------------------------------------------------
    // RENDERIZAÇÃO
    // -------------------------------------------------------------------------

    return (
        <Container className="my-5">
            <Row className="justify-content-md-center">
                <Col md={6}>
                    <Card>
                        <Card.Header className="text-center bg-primary text-white">
                            <h4>E-commerce AV1 - {isLoginView ? 'Login de Cliente' : 'Cadastro de Cliente'}</h4>
                        </Card.Header>
                        <Card.Body>
                            {message && <Alert variant={message.type} onClose={() => setMessage(null)} dismissible>{message.text}</Alert>}

                            {isLoginView ? (
                                // ----------------- TELA DE LOGIN -----------------
                                <Form onSubmit={handleLoginSubmit}>
                                    <h5 className="mb-4 text-center text-muted">(Autenticação Ilustrativa)</h5>
                                    <Form.Group className="mb-3">
                                        <Form.Label>E-mail</Form.Label>
                                        <Form.Control
                                            type="email"
                                            name="email"
                                            value={loginData.email}
                                            onChange={handleLoginChange}
                                            required
                                        />
                                    </Form.Group>

                                    <Form.Group className="mb-4">
                                        <Form.Label>Senha</Form.Label>
                                        <Form.Control
                                            type="password"
                                            name="senha"
                                            value={loginData.senha}
                                            onChange={handleLoginChange}
                                            required
                                        />
                                    </Form.Group>

                                    <div className="d-grid gap-2">
                                        <Button variant="success" type="submit" disabled={isLoading}>
                                            {isLoading ? 'Acessando...' : 'Entrar (Ilustrativo)'}
                                        </Button>
                                    </div>
                                </Form>
                            ) : (
                                // ----------------- TELA DE CADASTRO -----------------
                                <Form onSubmit={handleCadastroSubmit}>
                                    <h5 className="mb-4 text-center text-muted">(Fazendo a chamada real para o Backend)</h5>
                                    
                                    <Form.Group className="mb-3">
                                        <Form.Label>Nome Completo</Form.Label>
                                        <Form.Control
                                            type="text"
                                            name="nome"
                                            value={cadastroData.nome}
                                            onChange={handleCadastroChange}
                                            required
                                        />
                                    </Form.Group>

                                    <Form.Group className="mb-3">
                                        <Form.Label>E-mail</Form.Label>
                                        <Form.Control
                                            type="email"
                                            name="email"
                                            value={cadastroData.email}
                                            onChange={handleCadastroChange}
                                            required
                                        />
                                    </Form.Group>
                                    
                                    <Form.Group className="mb-3">
                                        <Form.Label>Senha</Form.Label>
                                        <Form.Control
                                            type="password"
                                            name="senha"
                                            value={cadastroData.senha}
                                            onChange={handleCadastroChange}
                                            minLength={6}
                                            required
                                        />
                                    </Form.Group>

                                    <Form.Group className="mb-4">
                                        <Form.Label>Telefone (Opcional)</Form.Label>
                                        <Form.Control
                                            type="text"
                                            name="telefone"
                                            value={cadastroData.telefone}
                                            onChange={handleCadastroChange}
                                        />
                                    </Form.Group>

                                    <div className="d-grid gap-2">
                                        <Button variant="primary" type="submit" disabled={isLoading}>
                                            {isLoading ? 'Cadastrando...' : 'Cadastrar Cliente'}
                                        </Button>
                                    </div>
                                </Form>
                            )}
                        </Card.Body>
                        <Card.Footer className="text-center">
                            <Button 
                                variant="link" 
                                onClick={() => {
                                    setIsLoginView(!isLoginView);
                                    setMessage(null);
                                    setIsLoading(false);
                                }}
                            >
                                {isLoginView ? 'Não tem conta? Cadastre-se' : 'Já tem conta? Fazer Login'}
                            </Button>
                        </Card.Footer>
                    </Card>
                </Col>
            </Row>
        </Container>
    );
};

export default AuthScreen;