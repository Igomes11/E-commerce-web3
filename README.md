# 🛍️ E-commerce Web3

**E-commerce Web3** é uma aplicação web desenvolvida como projeto acadêmico, com o objetivo de implementar um sistema completo de **gestão de produtos, clientes, endereços, pedidos e pagamentos**, utilizando **NestJS** no backend e **ReactJS** no frontend.

O projeto segue boas práticas de arquitetura, modularização e uso de banco de dados relacional com **MySQL**, além de documentação via **Swagger**.

---

## 🚀 Tecnologias Utilizadas

### **Backend**
- [NestJS](https://nestjs.com/) — framework Node.js baseado em TypeScript  
- [TypeORM](https://typeorm.io/) — ORM para banco de dados relacional  
- [MySQL](https://www.mysql.com/) — banco de dados relacional  
- [Class Validator](https://github.com/typestack/class-validator) — validação de dados DTO  
- [Swagger](https://swagger.io/) — documentação automática da API  
- [Dotenv](https://www.npmjs.com/package/dotenv) — gerenciamento de variáveis de ambiente  

### **Frontend (Semana 2)**
- [ReactJS](https://reactjs.org/) — biblioteca para interfaces  
- [Axios](https://axios-http.com/) — cliente HTTP para requisições à API  
- [Bootstrap](https://getbootstrap.com/) ou [TailwindCSS](https://tailwindcss.com/) — estilização  

---

## 🧱 Estrutura do Projeto

backend/
│
├── src/
│ ├── app.module.ts
│ ├── main.ts
│ ├── modules/
│ │ ├── clientes/
│ │ ├── enderecos/
│ │ ├── categorias/
│ │ ├── produtos/
│ │ ├── pedidos/
│ │ └── pagamentos/
│ └── common/
│
├── .env
├── package.json
└── tsconfig.json


---

## ⚙️ Configuração do Ambiente

### 1️⃣ Clone o repositório

git clone https://github.com/Igomes11/ecommerce-web3.git
cd ecommerce-web3/backend

2️⃣ Instale as dependências

npm install

DB_HOST=localhost
DB_PORT=3306 #porta do MySQL
DB_USERNAME=root
DB_PASSWORD=suasenha
DB_DATABASE=ecommerce


💡 Dica: verifique se o MySQL está rodando localmente e o banco ecommerce está criado.

🧩 Módulos Implementados
👤 Clientes

Gerencia os dados dos clientes da loja.

Endpoints principais:

POST /clientes — cria um novo cliente

GET /clientes — lista todos os clientes

PATCH /clientes/:id — atualiza informações do cliente

DELETE /clientes/:id — remove um cliente

Exemplo de dados:

{
  "id": "1",
  "nome": "Igor",
  "email": "igor@exemplo.com",
  "telefone": "81999999999",
  "criadoEm": "2025-10-29T12:19:16.600Z"
}

🏠 Endereços

Cada cliente pode ter um ou mais endereços, com um endereço marcado como padrão.

Endpoints principais:

POST /enderecos — adiciona um endereço a um cliente

GET /enderecos — lista todos os endereços

PATCH /enderecos/:id — atualiza um endereço

Exemplo de dados:
```s
{
  "id": "1",
  "rua": "Av. Brasil",
  "numero": "123",
  "cidade": "Recife",
  "estado": "PE",
  "cep": "50000-000",
  "padrao": true,
  "clienteId": "1"
}

🛒 Produtos e Categorias

Controle de estoque, preços e descrição de produtos.

***Categorias***

POST /categorias

GET /categorias

Produtos

POST /produtos

GET /produtos

PATCH /produtos/:id

DELETE /produtos/:id

Relacionamento:
Categoria 1:N Produtos

📦 Pedidos e Itens do Pedido (em desenvolvimento)

Gerencia os pedidos feitos pelos clientes, vinculando produtos e calculando o valor total automaticamente.

Endpoints planejados:

POST /pedidos — cria um novo pedido

GET /pedidos — lista pedidos com seus itens

PATCH /pedidos/:id — atualiza status do pedido

Regras de negócio:

Um pedido pertence a um cliente

O total é calculado com base nos itens (quantidade * preço)

O status inicial é "AGUARDANDO_PAGAMENTO"

💳 Pagamentos (em desenvolvimento)

Responsável por registrar pagamentos e atualizar o status dos pedidos e do estoque.

Fluxo previsto:

Pedido criado com status "AGUARDANDO_PAGAMENTO"

Ao confirmar o pagamento:

Pedido passa para "PAGO"

Estoque de cada produto é reduzido

Um registro de pagamento é criado no banco

🧠 Regras de Negócio Implementadas

✅ Cliente pode ter múltiplos endereços
✅ Email do cliente é único
✅ Endereço padrão é atualizado automaticamente
✅ Pedido soma automaticamente o valor total dos produtos
✅ Pagamento altera o status do pedido e atualiza o estoque

🧪 Testes com Postman
Criar cliente
POST http://localhost:3000/clientes
Content-Type: application/json

{
  "nome": "Igor",
  "email": "igor@exemplo.com",
  "telefone": "81999999999"
}

Criar endereço
POST http://localhost:3000/enderecos
Content-Type: application/json

{
  "clienteId": "1",
  "rua": "Rua Exemplo",
  "numero": "45",
  "cidade": "Recife",
  "estado": "PE",
  "cep": "50000-000",
  "padrao": true
}

📘 Documentação (Swagger)

Após subir o servidor, acesse:
👉 http://localhost:3000/api

Lá você encontrará todos os endpoints documentados automaticamente com Swagger UI.

🌐 Deploy (Previsto)

Backend: Render
 ou Railway

Banco de Dados: Railway
 ou PlanetScale

Frontend: Vercel
 ou Netlify

📅 Cronograma de Desenvolvimento
Etapa	Tarefa	Status
Dia 1	Configuração do ambiente	✅
Dia 2	Categorias e Produtos	✅
Dia 3	Clientes e Endereços	✅
Dia 4	Pedidos e Itens do Pedido	⚙️ Em andamento
Dia 5	Pagamentos e Estoque	⏳ A fazer
Dia 6	Testes + Swagger + README	⏳ A fazer
Dia 7	Deploy Backend	⏳ A fazer
Semana 2	Frontend React	⏳ A fazer
👨‍💻 Autor

Igor Gomes
📍 Desenvolvedor Full Stack | Estudante de Sistemas de Informação
📧 igor@exemplo.com

💻 Projeto acadêmico — 3º semestre (Gestão de Riscos e E-commerce Web3)

🏁 Status do Projeto

🚧 Em desenvolvimento
Backend funcional e frontend em fase de estruturação.
As próximas etapas incluem o módulo de pagamento, documentação Swagger e integração com React.

⭐ Se este projeto te inspirou, deixe uma estrela no repositório!

