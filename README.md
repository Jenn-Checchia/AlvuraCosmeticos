# 🌿 Alvura — Natural Cosméticos

E-commerce artesanal full-stack desenvolvido em **React + Vite** (Frontend) e **Java Spring Boot** (Backend) com banco de dados **PostgreSQL**. O projeto é focado em uma estética botânica acolhedora, tipografia editorial (serifada e sans-serif) e uma experiência de compra fluida com suporte a encomendas personalizadas e painel de gestão integralmente persistido em banco de dados.

---

## ✨ Funcionalidades Implementadas

### 1. Arquitetura SPA & API REST (Full-Stack)
- **Frontend (React):** Navegação instantânea entre telas sem recarregamento de página, gerenciada pelo estado de rotas no `App.jsx`. Header fixo (`position: sticky`) com acesso rápido e responsividade adaptativa (desktop, tablet e mobile).
- **Backend (Spring Boot):** API RESTful robusta estruturada no padrão MVC (Model-View-Controller) fornecendo endpoints de CRUD completos e seguros para o frontend.
- **Banco de Dados:** Persistência relacional de Produtos e Usuários utilizando PostgreSQL e mapeamento objeto-relacional (ORM) via Hibernate/JPA.

### 2. Vitrine Principal (Home)
- Banner principal, manifestos da marca (*Brasil*, *Matérias-primas*, *Luxo artesanal*), **Biblioteca Botânica**, **Uma Seleção para Começar**, seção de feedbacks, newsletter e rodapé institucional.
- Botões de ação conectados diretamente ao catálogo (*Acervo*) e ao atendimento via WhatsApp.

### 3. Acervo (Catálogo Interativo com Filtros)
- Grade responsiva de até **4 colunas** alimentada dinamicamente pelo banco de dados PostgreSQL.
- **Busca em tempo real** por nome ou categoria do produto.
- **Filtros combináveis** por:
  - Tipo de produto (*Hidratante, Vela, Sabonete, Escalda-pés, Kits*).
  - Ingredientes (*Cereja, Avelã, Mel, Frutas cítricas*).
  - Disponibilidade (*Em estoque* ou *Sob encomenda*).
  - Tamanho / Peso e Faixa de preço.

### 4. Modal de Detalhes & Personalização de Encomendas
- Ao clicar em qualquer card do acervo, abre um modal sobreposto com foto ampliada, descrição sensorial, notas botânicas e seletor de quantidade.
- Para itens **Sob encomenda** ou **Kits personalizáveis**, exibe automaticamente opções de escolha de aroma, tipo de embalagem/acabamento e campo de mensagem para cartão presente.

### 5. Página de Encomendas & Atelier
- Página dedicada a pedidos personalizados, eventos e brindes corporativos com formulário interativo e envio direto de orçamento.

### 6. Autenticação & Perfis de Acesso (Cliente / Administrador)
- Modal único (`AuthModal`) que alterna suavemente entre **Login** e **Criação de Conta**, comunicando-se com a API para verificação e persistência de dados.
- Controle de acesso baseado em perfil (`cliente` vs. `admin`), exibindo painéis e botões de gerenciamento apenas para usuários com permissão mestre.

### 7. Portal do Administrador
- **Tela Inicial (Portal):** Interface editorial em tom vinho escuro com acesso rápido aos módulos administrativos.
- **Acervo & Estoque (CRUD):** Cadastro, edição, exclusão e alternância rápida de disponibilidade. As ações atualizam o banco de dados via requisições POST/PUT/DELETE e refletem em tempo real na vitrine.
- **Encomendas e Dados do Site:** Acompanhamento de solicitações e gerenciamento centralizado de contatos e textos institucionais.

---

## 🛠️ Tecnologias Utilizadas

### Frontend
- **[React](https://react.dev/)** — Construção da interface (Componentes, `useState`, `useEffect`, `useMemo`, `fetch` API).
- **[Vite](https://vitejs.dev/)** — Bundler e servidor de desenvolvimento ultrarrápido (HMR).
- **CSS3 Puro (Modular)** — Variáveis CSS (`:root`), Grid, Flexbox e Media Queries.

### Backend & Banco de Dados
- **[Java 17+](https://adoptium.net/)** — Linguagem principal do servidor.
- **[Spring Boot 3](https://spring.io/projects/spring-boot)** — Framework base da aplicação (Web, Data JPA).
- **[Hibernate](https://hibernate.org/)** — Mapeamento Objeto-Relacional (ORM) para o banco.
- **[PostgreSQL](https://www.postgresql.org/)** — Sistema de Gerenciamento de Banco de Dados Relacional.
- **Maven** — Gerenciamento de dependências e build do backend.

---

## 🚀 Como Rodar o Projeto Localmente

### Pré-requisitos
Certifique-se de ter instalado em sua máquina:
- **Node.js** (v18+) e **npm/yarn**
- **Java JDK** (v17 ou superior)
- **PostgreSQL** e **pgAdmin**

### Passo 1: Configuração do Banco de Dados
1. Abra o pgAdmin e crie um novo banco de dados vazio chamado `alvura_db`.

### Passo 2: Clonar e Configurar o Repositório
```bash
git clone https://github.com/seu-usuario/alvura-cosmeticos.git
cd alvura-cosmeticos
```

### Passo 3: Executar o Backend (Java Spring Boot)
1. Navegue até a pasta do backend:
   ```bash
   cd alvura-backend
   ```
2. Verifique o arquivo `src/main/resources/application-secret.properties` e garanta que as credenciais correspondem ao seu PostgreSQL local (usuário e senha).
3. Inicie a aplicação (as tabelas e o usuário administrador serão criados automaticamente):
   ```bash
   ./mvnw spring-boot:run
   # No Windows: .\mvnw.cmd spring-boot:run
   ```
   *O backend rodará na porta `8080`.*

### Passo 4: Executar o Frontend (React)
1. Abra uma nova aba no terminal e navegue até a pasta do frontend:
   ```bash
   cd alvura-frontend
   ```
2. Instale as dependências e inicie o servidor:
   ```bash
   npm install
   npm run dev
   ```
3. Acesse no navegador: `http://localhost:5173`.

---

## 🔑 Credenciais de Teste

Ao rodar o backend pela primeira vez, o *Seeder* do banco de dados cria automaticamente a conta principal para você testar a aplicação:

- **Administrador:** `admin@alvura.com.br` | Senha: `1234`
*(Você pode criar contas de clientes comuns utilizando o próprio botão "Registre-se" no site).*

---

## 📁 Estrutura do Monorepo

```text
alvura-cosmeticos/
├── alvura-frontend/                 # 🎨 CAMADA DE VISÃO (React + Vite)
│   ├── public/                      # Imagens, favicon e assets estáticos
│   ├── src/
│   │   ├── components/              # Modais, Header, Cards e botões
│   │   ├── pages/                   # Telas principais (Home, Acervo, Admin, etc.)
│   │   ├── styles/                  # Estilos modulares em CSS puro
│   │   └── App.jsx                  # Componente raiz, rotas e chamadas (fetch) da API
│   └── package.json
│
├── alvura-backend/                  # ⚙️ CAMADA DE SERVIDOR E DADOS (Spring Boot)
│   ├── src/main/java/Alvura/backend/
│   │   ├── config/                  # Semeadores de banco (AdminSeeder)
│   │   ├── controller/              # Endpoints da API REST (ProdutoController, UsuarioController)
│   │   ├── model/                   # Entidades do banco de dados (Produto, Usuario)
│   │   ├── repository/              # Interfaces de comunicação com o PostgreSQL (JPA)
│   │   └── service/                 # Regras de negócio e intermediação (ProdutoService)
│   ├── src/main/resources/          # application.properties (Configurações do Spring/JPA)
│   └── pom.xml
│
├── .gitignore                       # Ignora node_modules, compilados Java e senhas
└── README.md
```