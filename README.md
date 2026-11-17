# 🌿 Alvura — Natural Cosméticos

E-commerce artesanal full-stack desenvolvido em **React + Vite** (Frontend) e **Java Spring Boot** (Backend) com banco de dados **PostgreSQL**. O projeto é focado em uma estética botânica acolhedora, tipografia editorial (serifada e sans-serif) e uma experiência de compra fluida com suporte a encomendas personalizadas, sacola isolada por usuário e painel de gestão integralmente persistido em banco de dados.

---

## ✨ Funcionalidades Implementadas

### 1. Arquitetura SPA & API REST (Full-Stack)
- **Frontend (React):** Navegação instantânea entre telas sem recarregamento de página, gerenciada pelo estado de rotas no `App.jsx`. Header fixo (`position: sticky`) com acesso rápido, gaveta lateral de compras (`CartDrawer`) e responsividade adaptativa (desktop, tablet e mobile).
- **Backend (Spring Boot):** API RESTful robusta estruturada no padrão MVC (Model-View-Controller) fornecendo endpoints de CRUD completos, upload de mídia e autenticação segura para o frontend.
- **Banco de Dados:** Persistência relacional de Produtos, Categorias, Usuários, Encomendas e Configurações Globais utilizando PostgreSQL e mapeamento objeto-relacional (ORM) via Hibernate/JPA.

### 2. Vitrine Principal (Home)
- Banner principal dinâmico, manifestos da marca (*Brasil*, *Matérias-primas*, *Luxo artesanal*), **Biblioteca Botânica**, **Uma Seleção para Começar**, seção de feedbacks, newsletter e rodapé institucional.
- Botões de ação conectados diretamente ao catálogo (*Acervo*), à sacola de compras e ao atendimento via WhatsApp.

### 3. Acervo (Catálogo Data-Driven com Filtros Dinâmicos)
- Grade responsiva de até **4 colunas** alimentada dinamicamente pelo banco de dados PostgreSQL, exibindo ingredientes e notas botânicas diretamente nos cards.
- **Busca em tempo real** por nome ou categoria do produto.
- **Filtros dinâmicos (Data-Driven Filtering)** gerados automaticamente a partir dos itens cadastrados no banco, operando com lógica combinável (**OR**):
  - Categorias e Tamanhos/Pesos dinâmicos.
  - Extração automática de Ingredientes individuais a partir das descrições dos produtos.
  - Disponibilidade (*Em estoque* ou *Sob encomenda*).
  - **Slider Duplo de Faixa de Preço (Range):** Controle deslizante interativo e campos numéricos sincronizados com os valores mínimo e máximo reais do catálogo.

### 4. Sacola de Compras Isolada & Personalização
- **Isolamento por Sessão/Usuário:** A sacola de compras (`localStorage`) é vinculada individualmente a cada conta autenticada (ou ao perfil visitante), garantindo privacidade e independência ao alternar entre usuários no mesmo navegador.
- **Modal de Detalhes:** Ao clicar em qualquer card do acervo, abre um modal sobreposto com foto ampliada, descrição sensorial, notas botânicas e seletor de quantidade. Para itens **Sob encomenda** ou **Kits personalizáveis**, exibe opções de escolha de aroma, embalagem e mensagem para cartão presente.

### 5. Página de Encomendas & Atelier
- Página dedicada a pedidos personalizados, eventos e brindes corporativos com formulário interativo, gravação direta no banco de dados e redirecionamento automático para orçamento via WhatsApp.

### 6. Segurança, Criptografia & Sessão Persistente
- **Criptografia BCrypt:** Senhas armazenadas exclusivamente como hashes criptográficos via `BCryptPasswordEncoder` (Spring Security), com sanitização de respostas JSON para nunca expor hashes ao cliente.
- **Sessão Inteligente ("Manter conectado"):** Suporte nativo a `sessionStorage` (mantém o login ativo ao atualizar a página durante a mesma sessão) e `localStorage` (persistência contínua entre reinicializações do navegador).
- **Controle de Acesso (RBAC):** Separação entre perfis `cliente` e `admin`, restringindo o acesso às rotas e telas de gerenciamento.

### 7. Portal do Administrador
- **Tela Inicial (Portal):** Interface editorial em tom vinho escuro com acesso rápido aos 4 módulos administrativos.
- **Acervo & Estoque (CRUD + Upload Real):** Cadastro, edição, exclusão, criação dinâmica de categorias e alternância rápida de disponibilidade. Inclui **upload real de imagens** (`MultipartFile`) com limite de **1MB**, armazenamento em disco no servidor (`/uploads/**`) e validação no cliente.
- **Gestão de Encomendas:** Acompanhamento de solicitações por status (*Novo*, *Em produção*, *Concluído*), além das opções de **arquivar/ocultar** pedidos concluídos e **excluir** registros permanentemente.
- **Equipe & Administradores:** Painel dedicado para cadastrar novas contas com privilégio de administrador e revogar acessos existentes (com trava de segurança contra autoexclusão).
- **Editar Dados do Site:** Gerenciamento centralizado de contatos (WhatsApp, Instagram, e-mail), horários, textos institucionais e troca de imagens principais da vitrine.

---

## 🛠️ Tecnologias Utilizadas

### Frontend
- **[React](https://react.dev/)** — Construção da interface (Componentes, `useState`, `useEffect`, `useMemo`, `fetch` API).
- **[Vite](https://vitejs.dev/)** — Bundler e servidor de desenvolvimento ultrarrápido (HMR).
- **CSS3 Puro (Modular)** — Variáveis CSS (`:root`), Grid, Flexbox, Dual-Range Slider customizado e Media Queries.

### Backend & Banco de Dados
- **[Java 17+](https://adoptium.net/)** — Linguagem principal do servidor.
- **[Spring Boot 3 / 4](https://spring.io/projects/spring-boot)** — Framework base da aplicação (Web MVC, Data JPA, Spring Security Crypto).
- **[Hibernate](https://hibernate.org/)** — Mapeamento Objeto-Relacional (ORM) para o banco.
- **[PostgreSQL](https://www.postgresql.org/)** — Sistema de Gerenciamento de Banco de Dados Relacional.
- **Maven** — Gerenciamento de dependências e build do backend.

---

## 🚀 Como Rodar o Projeto Localmente

### Pré-requisitos
Certifique-se de ter instalado em sua máquina:
- **Node.js** (v18+) e **npm/yarn**
- **Java JDK** (v17 ou superior)

### Passo 1: Clonar o Repositório
```bash
git clone [https://github.com/seu-usuario/alvura-cosmeticos.git](https://github.com/seu-usuario/alvura-cosmeticos.git)
cd alvura-cosmeticos

```

### Passo 2: Configuração de Segurança e Banco de Dados

Para proteger dados sensíveis (como senhas de banco de dados na nuvem), este projeto utiliza um arquivo de *template* que é ignorado pelo Git.

1. Navegue até a pasta de configurações do backend:

```bash
cd alvura-backend/src/main/resources/

```

2. Crie uma cópia do arquivo `application-secret-template.properties` e renomeie a cópia para **`application-secret.properties`**.
3. Abra o novo arquivo `application-secret.properties` e insira a URL e a senha do banco de dados PostgreSQL.

### Passo 3: Executar o Backend (Java Spring Boot)

1. Volte para a raiz da pasta do backend (`alvura-backend`).
2. Inicie a aplicação:

```bash
./mvnw spring-boot:run
# No Windows: .\mvnw.cmd spring-boot:run

```

*O backend rodará na porta `8080`. Se o banco de dados estiver vazio, o Hibernate criará as tabelas e o `AdminSeeder` criará o administrador mestre com senha hasheada automaticamente.*

### Passo 4: Executar o Frontend (React)

1. Abra uma nova aba no terminal e navegue até a pasta do frontend:

```bash
cd ../alvura-frontend

```

2. Instale as dependências e inicie o servidor:

```bash
npm install
npm run dev

```

3. Acesse no navegador: `http://localhost:5173`.

---

## 🔑 Credenciais de Teste

Ao rodar o backend conectado a um banco vazio pela primeira vez, o *Seeder* da aplicação cria automaticamente a conta principal para testes (já criptografada com BCrypt):

* **Administrador:** `admin@alvura.com.br` | Senha: `1234`
*(Novos clientes podem se cadastrar pelo modal público "Registre-se", e novos administradores podem ser cadastrados dentro do Portal do Administrador).*

---

## 📁 Estrutura do Monorepo

```text
alvura-cosmeticos/
├── alvura-frontend/                 # 🎨 CAMADA DE VISÃO (React + Vite)
│   ├── public/                      # Imagens, favicon e assets estáticos
│   ├── src/
│   │   ├── components/              # Modais (Auth, Produto), Header, CartDrawer, Cards
│   │   ├── pages/                   # Telas principais (Home, Acervo, Encomendas, Admin, FAQ, Contato)
│   │   ├── styles/                  # Estilos modulares em CSS puro
│   │   └── App.jsx                  # Componente raiz, rotas, sessões e chamadas (fetch) da API
│   └── package.json
│
├── alvura-backend/                  # ⚙️ CAMADA DE SERVIDOR E DADOS (Spring Boot)
│   ├── uploads/                     # Diretório gerado em runtime para imagens enviadas via painel
│   ├── src/main/java/Alvura/backend/
│   │   ├── config/                  # AdminSeeder, SecurityConfig (BCrypt) e WebConfig (Static Uploads)
│   │   ├── controller/              # Endpoints REST (Produto, Usuario, Categoria, Encomenda, ConfigSite, Upload)
│   │   ├── model/                   # Entidades JPA (Produto, Usuario, Categoria, Encomenda, ConfigSite)
│   │   ├── repository/              # Interfaces de comunicação com o PostgreSQL (JPA)
│   │   └── service/                 # Regras de negócio e intermediação (ProdutoService)
│   ├── src/main/resources/          # application.properties e templates de credenciais
│   └── pom.xml
│
├── .gitignore                       # Ignora node_modules, compilados Java, uploads locais e senhas
└── README.md

```

```

```
