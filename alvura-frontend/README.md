# 🌿 Alvura — Natural Cosméticos

E-commerce artesanal desenvolvido em **React + Vite** para a marca **Alvura Natural Cosméticos**, focado em uma estética botânica acolhedora, tipografia editorial (serifada e sans-serif) e experiência de compra fluida com suporte a encomendas personalizadas.

---

## ✨ Funcionalidades Implementadas

### 1. Arquitetura SPA (Single Page Application)
- Navegação instantânea entre telas sem recarregamento de página, gerenciada centralmente pelo estado de rotas no `App.jsx`.
- **Header fixo (`position: sticky`)** cobrindo 100% da largura da tela com acesso rápido às páginas, busca e sacola.
- Escala tipográfica acessível configurada na raiz (`html { font-size: 18px; }`) com unidades relativas (`rem`) e responsividade adaptativa para desktop, tablet e mobile.

### 2. Vitrine Principal (Home)
- Banner principal, manifestos da marca (*Brasil*, *Matérias-primas*, *Luxo artesanal*), **Biblioteca Botânica**, **Uma Seleção para Começar**, seção de feedbacks, newsletter e rodapé institucional.
- Botões de ação conectados diretamente ao catálogo (*Acervo*) e ao atendimento via WhatsApp.

### 3. Acervo (Catálogo Interativo com Filtros)
- Grade responsiva de até **4 colunas** alimentada por dados simulados (`produtosMock.js`), preparada para futura integração com API/backend.
- **Busca em tempo real** por nome ou categoria do produto.
- **Filtros combináveis** por:
  - Tipo de produto (*Hidratante, Vela, Sabonete, Escalda-pés, Kits*)
  - Ingredientes (*Cereja, Avelã, Mel, Frutas cítricas*)
  - Disponibilidade (*Em estoque* ou *Sob encomenda*)
  - Tamanho / Peso
  - Faixa de preço

### 4. Modal de Detalhes & Personalização de Encomendas
- Ao clicar em qualquer card do acervo, abre um modal sobreposto com foto ampliada, descrição sensorial, notas botânicas e seletor de quantidade.
- Para itens **Sob encomenda** ou **Kits personalizáveis**, exibe automaticamente opções de escolha de aroma, tipo de embalagem/acabamento e campo de mensagem para cartão presente.

### 5. FAQ (Perguntas Frequentes)
- Layout editorial com ilustrações botânicas decorativas nas laterais (`mix-blend-mode: multiply`).
- Balões interativos que expandem suavemente tanto ao passar o mouse (`:hover`) quanto ao clicar/tocar em dispositivos móveis.

### 6. Fale Conosco (Contato)
- Faixa de largura total na paleta marrom âmbar (`#7C3B00`) com ilustração autoral e balões de fala clicáveis para **WhatsApp**, **Instagram** e **E-mail**.

---

## 🛠️ Tecnologias Utilizadas

- **[React](https://react.dev/)** — Biblioteca principal para construção da interface baseada em componentes e hooks (`useState`, `useEffect`, `useMemo`).
- **[Vite](https://vitejs.dev/)** — Bundler e servidor de desenvolvimento ultrarrápido com Hot Module Replacement (HMR).
- **CSS3 Puro (Modular)** — Estilização organizada por página/componente utilizando variáveis CSS (`:root`), CSS Grid, Flexbox, animações suaves e media queries.
- **SVG Inline** — Ícones e ilustrações vetoriais leves e escaláveis sem dependências externas pesadas.

---

## 📁 Estrutura de Pastas

```text
alvura-cosmeticos/
├── public/
│   └── assets/
│       └── products/        # Imagens dos produtos e ilustrações botânicas
├── src/
│   ├── components/
│   │   ├── Header.jsx       # Cabeçalho fixo com navegação principal
│   │   └── ProdutoModal.jsx # Modal de detalhes do produto e personalização
│   ├── data/
│   │   └── produtosMock.js  # Base de dados simulada do catálogo
│   ├── pages/
│   │   ├── AcervoPage.jsx   # Catálogo completo com pesquisa e filtros
│   │   ├── ContatoPage.jsx  # Página Fale Conosco
│   │   └── FaqPage.jsx      # Página de Perguntas Frequentes
│   ├── styles/
│   │   ├── style.css        # Estilos globais, variáveis, Home, Header e Footer
│   │   ├── acervo.css       # Estilos da página de catálogo e filtros
│   │   ├── contato.css      # Estilos da página Fale Conosco
│   │   ├── faq.css          # Estilos dos balões e layout do FAQ
│   │   └── produtoModal.css # Estilos do modal de detalhes e encomendas
│   ├── App.jsx              # Componente raiz e gerenciamento de navegação
│   └── main.jsx             # Ponto de entrada da aplicação React
├── index.html
├── package.json
└── README.md