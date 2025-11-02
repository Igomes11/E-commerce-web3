import {
  Container,
  Row,
  Col,
  Card,
  Alert,
  Button,
  Spinner,
} from "react-bootstrap";
import type { CurrentView, User, Produto } from "../types/types";
import { useState, useEffect } from "react";
import axios from "axios";

const API_PEDIDO_URL = "http://localhost:3000/pedido";
const API_PAGAMENTO_URL = "http://localhost:3000/pagamento";

// Interfaces adaptadas do backend
interface ItemPedido {
  id: number;
  quantidade: number;
  precoVenda: number;
  subtotal: number;
  produto: Produto;
}

interface Pedido {
  id: number;
  subtotal: number;
  total: number;
  quantidadeTotal: number;
  dataCriacao: string;
  status: string; // PedidoStatus
  itens: ItemPedido[];
  endereco: {
    id: number;
    logradouro: string;
    numero: string;
    cidade: string;
    estado: string;
  };
}

// Valores do Enum de Pagamento (para uso no frontend)
const PagamentoStatus = {
  PAGO: "PAGO",
  CANCELADO: "CANCELADO",
} as const;

interface OrderHistoryProps {
  user: User;
  onChangeView: (view: CurrentView) => void;
}

const OrderHistory: React.FC<OrderHistoryProps> = ({ user, onChangeView }) => {
  const [orders, setOrders] = useState<Pedido[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    fetchOrders();
  }, [user.id]);

  const fetchOrders = async () => {
    setIsLoading(true);
    setError(null);
    try {
      // Busca todos os pedidos do cliente (GET /pedido/cliente/:clienteId)
      const response = await axios.get<Pedido[]>(
        `${API_PEDIDO_URL}/cliente/${user.id}`
      );
      setOrders(response.data);
    } catch (err) {
      setError("Erro ao carregar o histórico de pedidos.");
    } finally {
      setIsLoading(false);
    }
  };

  const handleProcessPayment = async (
    pedidoId: number,
    status: typeof PagamentoStatus.PAGO | typeof PagamentoStatus.CANCELADO
  ) => {
    setIsLoading(true);
    setError(null);
    try {
      // Chama a rota de processamento de pagamento do backend
      const paymentResponse = await axios.post(
        `${API_PAGAMENTO_URL}/processar`,
        {
          pedidoId: pedidoId,
          metodo: "Cartão", // Método fixo para simulação, o backend não usa para a lógica
          valor: 0, // O backend ignora este valor e usa o total do pedido
          novoStatus: status,
        }
      );

      alert(
        `Pagamento do Pedido #${pedidoId} processado com status: ${paymentResponse.data.status}.`
      );
      await fetchOrders(); // Recarrega os pedidos para atualizar o status e o estoque
    } catch (err) {
      let errorMsg = "Erro ao processar pagamento.";
      if (axios.isAxiosError(err) && err.response?.data?.message) {
        errorMsg = Array.isArray(err.response.data.message)
          ? err.response.data.message[0]
          : err.response.data.message;
      }
      setError(errorMsg);
    } finally {
      setIsLoading(false);
    }
  };

  const getStatusVariant = (status: string) => {
    switch (status) {
      case "PAGO":
        return "success";
      case "AGUARDANDO_PAGAMENTO":
        return "warning";
      case "ABERTO":
        return "info";
      case "CANCELADO":
        return "danger";
      default:
        return "secondary";
    }
  };

  if (isLoading) {
    return (
      <Container className="text-center mt-5">
        <Spinner animation="border" variant="primary" />
        <p className="mt-2">Carregando histórico...</p>
      </Container>
    );
  }

  if (error) {
    return (
      <Container className="mt-5">
        <Alert variant="danger">{error}</Alert>
        <Button onClick={fetchOrders}>Tentar Recarregar</Button>
      </Container>
    );
  }

  if (orders.length === 0) {
    return (
      <Container className="mt-5">
        <Alert variant="info">Você não tem pedidos realizados.</Alert>
        <Button onClick={() => onChangeView("catalog")}>
          Ir para o Catálogo
        </Button>
      </Container>
    );
  }

  return (
    <Container className="my-5">
      <h2>📋 Histórico de Pedidos</h2>
      {orders.map((order) => (
        <Card key={order.id} className="mb-4 shadow-sm">
          <Card.Header
            className={`bg-${getStatusVariant(
              order.status
            )} text-white d-flex justify-content-between align-items-center`}
          >
            <h4 className="mb-0">Pedido #{order.id}</h4>
            <span className={`badge bg-dark`}>{order.status}</span>
          </Card.Header>
          <Card.Body>
            <Row>
              <Col md={6}>
                <h5>Detalhes</h5>
                <p>
                  <strong>Data:</strong>{" "}
                  {new Date(order.dataCriacao).toLocaleDateString()}
                </p>
                <p>
                  <strong>Itens Totais:</strong> {order.quantidadeTotal}
                </p>
                <p className="fw-bold">
                  <strong>Total:</strong> R$ {order.total.toFixed(2)}
                </p>
              </Col>
              <Col md={6}>
                <h5>Entrega</h5>
                <p className="mb-1">
                  {order.endereco.logradouro}, {order.endereco.numero}
                </p>
                <p>
                  {order.endereco.cidade} - {order.endereco.estado}
                </p>
              </Col>
            </Row>
            <hr />

            <h5 className="mb-3">Produtos Comprados</h5>
            <ul>
              {order.itens.map((item) => (
                <li key={item.id}>
                  {item.produto.nome} ({item.quantidade}x) - R${" "}
                  {item.subtotal.toFixed(2)}
                </li>
              ))}
            </ul>

            {order.status === "AGUARDANDO_PAGAMENTO" && (
              <div className="mt-4">
                <Alert variant="warning">
                  Ação Necessária: Simular Pagamento
                </Alert>
                <Button
                  variant="success"
                  className="me-2"
                  onClick={() =>
                    handleProcessPayment(order.id, PagamentoStatus.PAGO as any)
                  }
                >
                  Simular Pagamento (Sucesso)
                </Button>
                <Button
                  variant="danger"
                  onClick={() =>
                    handleProcessPayment(
                      order.id,
                      PagamentoStatus.CANCELADO as any
                    )
                  }
                >
                  Simular Cancelamento
                </Button>
              </div>
            )}
          </Card.Body>
        </Card>
      ))}
    </Container>
  );
};

export default OrderHistory;
