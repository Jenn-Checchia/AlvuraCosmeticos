# 🌿 Alvura — Natural Cosméticos

E-commerce artesanal desenvolvido em **React + Vite** para a marca **Alvura Natural Cosméticos**, focado em uma estética botânica acolhedora, tipografia editorial (serifada e sans-serif) e experiência de compra fluida com suporte a encomendas personalizadas e painel de gestão integrado.

---

## ✨ Funcionalidades Implementadas

### 1. Arquitetura SPA (Single Page Application)
- Navegação instantânea entre telas sem recarregamento de página, gerenciada centralmente pelo estado de rotas no `App.jsx`.
- **Header fixo (`position: sticky`)** cobrindo 100% da largura da tela com acesso rápido às páginas, busca, autenticação e sacola.
- Escala tipográfica acessível configurada na raiz (`html { font-size: 18px; }`) com unidades relativas (`rem`) e responsividade adaptativa para desktop, tablet e mobile.

### 2. Vitrine Principal (Home)
- Banner principal, manifestos da marca (*Brasil*, *Matérias-primas*, *Luxo artesanal*), **Biblioteca Botânica**, **Uma Seleção para Começar**, seção de feedbacks, newsletter e rodapé institucional.
- Botões de ação conectados diretamente ao catálogo (*Acervo*) e ao atendimento via WhatsApp.

### 3. Acervo (Catálogo Interativo com Filtros)
- Grade responsiva de até **4 colunas** alimentada por estado dinâmico sincronizado com o painel administrativo (`produtosMock.js`).
- **Busca em tempo real** por nome ou categoria do produto.
- **Filtros combináveis** por:
  - Tipo de produto (*Hidratante, Vela, Sabonete, Escalda-pés, Kits* e categorias criadas pelo administrador)
  - Ingredientes (*Cereja, Avelã, Mel, Frutas cítricas*)
  - Disponibilidade (*Em estoque* ou *Sob encomenda*)
  - Tamanho / Peso
  - Faixa de preço

### 4. Modal de Detalhes & Personalização de Encomendas
- Ao clicar em qualquer card do acervo, abre um modal sobreposto com foto ampliada, descrição sensorial, notas botânicas e seletor de quantidade.
- Para itens **Sob encomenda** ou **Kits personalizáveis**, exibe automaticamente opções de escolha de aroma, tipo de embalagem/acabamento e campo de mensagem para cartão presente.

### 5. Página de Encomendas & Atelier
- Página dedicada a pedidos personalizados, eventos e brindes corporativos com formulário interativo e envio direto de orçamento.

### 6. Autenticação & Perfis de Acesso (Cliente / Administrador)
- Modal único (`AuthModal`) que alterna suavemente entre **Login** e **Criação de Conta**, com suporte a fechamento via tecla `ESC` ou clique externo.
- Controle de acesso baseado em perfil (`cliente` vs. `admin`), exibindo o botão **Área do Administrador** no cabeçalho para usuários com permissão de gestão.

### 7. Portal do Administrador
- **Tela Inicial (Portal):** Interface editorial em tom vinho escuro com acesso rápido aos módulos administrativos.
- **Acervo & Estoque:** Cadastro, edição, exclusão, upload/troca de fotografias, criação de novas categorias e alternância rápida de disponibilidade (`Em estoque` / `Sob encomenda`) refletindo em tempo real na vitrine.
- **Encomendas:** Acompanhamento de solicitações personalizadas com filtro por status (*Todos*, *Novo*, *Em produção*, *Concluído*).
- **Editar Dados do Site:** Gerenciamento centralizado de WhatsApp, Instagram, e-mail, endereço, textos institucionais e imagens principais.

### 8. FAQ & Fale Conosco
- **FAQ:** Layout editorial com ilustrações botânicas decorativas (`mix-blend-mode: multiply`) e balões interativos expansíveis no hover e toque.
- **Fale Conosco:** Faixa de largura total na paleta marrom âmbar (`#7C3B00`) com balões de fala clicáveis sincronizados com os contatos configurados no painel administrativo.

---

## 🛠️ Tecnologias Utilizadas

- **[React](https://react.dev/)** — Biblioteca principal para construção da interface baseada em componentes e hooks (`useState`, `useEffect`, `useMemo`).
- **[Vite](https://vitejs.dev/)** — Bundler e servidor de desenvolvimento ultrarrápido com Hot Module Replacement (HMR).
- **CSS3 Puro (Modular)** — Estilização organizada por página/componente utilizando variáveis CSS (`:root`), CSS Grid, Flexbox, animações suaves e media queries.
- **SVG Inline** — Ícones, favicon personalizado e ilustrações vetoriais leves e escaláveis.

---

## 🚀 Como Rodar o Projeto Localmente

### Pré-requisitos
Certifique-se de ter instalado em sua máquina:
- **[Node.js](https://nodejs.org/)** (versão 18 ou superior recomendada)
- **npm** (incluso no Node.js) ou **yarn**

### Passo a passo

1. **Clone o repositório:**
   ```bash
   git clone [https://github.com/seu-usuario/alvura-cosmeticos.git](https://github.com/seu-usuario/alvura-cosmeticos.git)

```
```
2. **Acesse a pasta do projeto:**
```bash
cd alvura-cosmeticos

```


3. **Instale as dependências:**
```bash
npm install

```


4. **Inicie o servidor de desenvolvimento:**
```bash
npm run dev

```


5. **Acesse no navegador:**
Abra o endereço exibido no terminal (geralmente `http://localhost:5173`).

### Credenciais de Teste (Ambiente Simulado)

Para testar os diferentes níveis de acesso no modal **Minha conta**:

* **Administrador:** `admin@alvura.com.br` | Senha: `1234`
* **Cliente:** `cliente@alvura.com.br` | Senha: `1234`



---

## 📁 Estrutura de Pastas

```text
alvura-cosmeticos/
├── public/
│   ├── favicon.svg              # Ícone editorial da aba do navegador
│   ├── images/                  # Fotografias institucionais e kits
│   └── assets/
│       └── products/            # Imagens dos produtos e ilustrações botânicas
├── src/
│   ├── components/
│   │   ├── AuthModal.jsx        # Modal de login e registro de usuários
│   │   ├── CategoryFilter.jsx   # Filtro de categorias da vitrine
│   │   ├── Header.jsx           # Cabeçalho fixo com navegação e acesso admin
│   │   ├── HeroBanner.jsx       # Banner principal da página inicial
│   │   ├── ProductCard.jsx      # Card individual de produto
│   │   └── ProdutoModal.jsx     # Modal de detalhes do produto e personalização
│   ├── data/
│   │   ├── produtosMock.js      # Base inicial de dados do catálogo
│   │   └── usuariosMock.js      # Base simulada de usuários e perfis
│   ├── pages/
│   │   ├── AcervoPage.jsx       # Catálogo completo com pesquisa e filtros
│   │   ├── AdminPage.jsx        # Portal do Administrador (Estoque, Encomendas e Site)
│   │   ├── ContatoPage.jsx      # Página Fale Conosco
│   │   ├── EncomendasPage.jsx   # Página de pedidos personalizados e eventos
│   │   └── FaqPage.jsx          # Página de Perguntas Frequentes
│   ├── styles/
│   │   ├── style.css            # Estilos globais, variáveis, Home, Header e Footer
│   │   ├── acervo.css           # Estilos da página de catálogo e filtros
│   │   ├── admin.css            # Estilos do Portal do Administrador
│   │   ├── authModal.css        # Estilos do modal de login e cadastro
│   │   ├── contato.css          # Estilos da página Fale Conosco
│   │   ├── encomendas.css       # Estilos da página de Encomendas
│   │   ├── faq.css              # Estilos dos balões e layout do FAQ
│   │   └── produtoModal.css     # Estilos do modal de detalhes e encomendas
│   ├── App.jsx                  # Componente raiz e gerenciamento central de estado
│   └── main.jsx                 # Ponto de entrada da aplicação React
├── index.html
├── package.json
└── README.md

```

```

```