import Header from './components/Header';
import HeroBanner from './components/HeroBanner';
import CategoryFilter from './components/CategoryFilter';
import ProductCard from './components/ProductCard';
import { produtos } from './mockdados/produtos';
import './styles/style.css';
import FaqPage from './pages/FaqPage';
import ContatoPage from "./pages/ContatoPage";
import AcervoPage from "./pages/AcervoPage";
import ProdutoModal from "./components/ProdutoModal";
import EncomendasPage from "./pages/EncomendasPage";
import AuthModal from "./components/AuthModal";
import AdminPage from "./pages/AdminPage";
import CartDrawer from "./components/CartDrawer";
// import { PRODUTOS_MOCK } from "./data/produtosMock";
import { useState, useEffect } from 'react';

const TELEFONE_ALVURA = "5567999999999";

export default function App() {

    const navegarPara = (e, destino, sectionId = null) => {
      e.preventDefault();
    
      setPaginaAtual(destino);
    
      if (destino === "home" && sectionId) {
        setTimeout(() => {
          document.getElementById(sectionId)?.scrollIntoView({
            behavior: "smooth",
          });
        }, 100);
      } else {
        window.scrollTo({
          top: 0,
          behavior: "smooth",
        });
      }
    };
  
  function pedirWhatsApp(itemOuTexto) {
    let textoFinal = "";

    if (typeof itemOuTexto === 'string') {
      // Se for um clique no Filtro de Categorias da Home
      if (itemOuTexto.startsWith("Linha de")) {
        textoFinal = `Olá, Alvura! Gostaria de saber mais sobre a ${itemOuTexto}.`;
      } else {
        // Se vier da página Contato, Newsletter ou Encomendas, a frase já vem montada!
        textoFinal = itemOuTexto;
      }
    } else {
      // Se for um objeto (clique em um produto individual)
      const nomeProduto = `${itemOuTexto.nome} (R$ ${itemOuTexto.preco.toFixed(2).replace('.', ',')})`;
      textoFinal = `Olá, Alvura! Vi no catálogo e gostaria de pedir: ${nomeProduto}`;
    }

    window.open(`https://wa.me/${configSite.whatsapp}?text=${encodeURIComponent(textoFinal)}`, '_blank');
  }
  
  function rolarParaCatalogo() {
    document.getElementById('catalogo')?.scrollIntoView({ behavior: 'smooth' });
  }
  
  const [paginaAtual, setPaginaAtual] = useState('home');
  const [authModalAberto, setAuthModalAberto] = useState(false);
  const [usuarioLogado, setUsuarioLogado] = useState(null);
  const [catalogoProdutos, setCatalogoProdutos] = useState([]);
  const [faqPerguntaInicial, setFaqPerguntaInicial] = useState(null);

  useEffect(() => {
      // Busca categorias
      fetch('http://localhost:8080/api/categorias')
          .then(res => res.json())
          .then(dados => setCategorias(dados.map(cat => cat.nome))) // Extrai só o texto!
          .catch(erro => console.error("Erro ao carregar categorias:", erro));

      // Busca produtos
      fetch('http://localhost:8080/api/produtos')
          .then(res => res.json())
          .then(dados => setCatalogoProdutos(dados))
          .catch(erro => console.error("Erro ao carregar produtos:", erro));

      // Busca encomendas
      fetch('http://localhost:8080/api/encomendas')
          .then(res => res.json())
          .then(dados => setEncomendasAdmin(dados))
          .catch(erro => console.error("Erro ao carregar encomendas:", erro));

      // Busca configurações globais do site
      fetch('http://localhost:8080/api/config')
          .then(res => res.json())
          .then(dados => setConfigSite(dados))
          .catch(erro => console.error("Erro ao carregar configs:", erro));
  }, []);

  const [categorias, setCategorias] = useState([
    "Hidratante",
    "Vela",
    "Sabonete",
    "Escalda-pés",
    "Kits",
  ]);

  const [encomendasAdmin, setEncomendasAdmin] = useState([
    {
      id: 1,
      cliente: "Camila & Rafael (Casamento)",
      ocasiao: "Casamento / Noivado",
      endereco: "Rua das Flores, 123 - Bairro Jardim",
      produto: "Mini Velas Aromáticas",
      quantidade: "50 a 99 unidades",
      aromas: "Cereja e Avelã, Mel e Camomila",
      dataEvento: "2026-12-14",
      observacoes: "Tag com iniciais C & R em dourado e fita off-white.",
      status: "Em produção",
    },
    {
      id: 2,
      cliente: "Estúdio Botânica Arquitetura",
      ocasiao: "Brinde Corporativo",
      produto: "Kits Presenteáveis Completos",
      quantidade: "30 a 49 unidades",
      aromas: "Patchouli Floral",
      dataEvento: "2026-12-20",
      observacoes: "Presentes de final de ano para clientes.",
      status: "Novo",
    },
  ]);

  const [configSite, setConfigSite] = useState({
    whatsapp: "5567999999999",
    instagram: "@alvura.cosmeticos",
    email: "oi@alvura.com.br",
    endereco: "Campo Grande, MS — Produção Artesanal",

    // Atendimento
    horarioAtendimento: "Seg–sex, das 9h às 18h",

    // Hero
    heroTitulo: "Catálogo",
    heroSubtitulo: "Beleza que nasce da natureza! Descubra uma nova forma de cuidar de si. Descubra Alvura.",
    imagemHero: "/assets/products/vela cereja.png",

    // Outros conteúdos
    textoContato: "Fale com humanos!",
    imagemAtelier: "/assets/products/vela floral.png",
  });

  const [adminResetTrigger, setAdminResetTrigger] = useState(0);

  const abrirAcervo = (e) => {
    e.preventDefault();
    setPaginaAtual("acervo");
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const [produtoSelecionado, setProdutoSelecionado] = useState(null);

  // No App.jsx:
const [carrinhoAberto, setCarrinhoAberto] = useState(false);
const [itensCarrinho, setItensCarrinho] = useState(() => {
  const salvo = localStorage.getItem("alvura_carrinho");
  return salvo ? JSON.parse(salvo) : [];
});

useEffect(() => {
  localStorage.setItem("alvura_carrinho", JSON.stringify(itensCarrinho));
}, [itensCarrinho]);

const adicionarAoCarrinho = (produto, quantidade = 1, aromaSelecionado = null) => {
  setItensCarrinho((prev) => {
    const indexExistente = prev.findIndex(
      (item) =>
        item.id === produto.id &&
        (item.aromaSelecionado || null) === (aromaSelecionado || null)
    );

    if (indexExistente > -1) {
      const atualizado = [...prev];
      atualizado[indexExistente].quantidade += quantidade;
      return atualizado;
    }

    return [
      ...prev,
      {
        ...produto,
        quantidade,
        aromaSelecionado,
      },
    ];
  });
  setCarrinhoAberto(true);
};

const atualizarQuantidadeCarrinho = (id, aromaSelecionado, novaQtd) => {
  if (novaQtd <= 0) {
    removerDoCarrinho(id, aromaSelecionado);
    return;
  }
  setItensCarrinho((prev) =>
    prev.map((item) =>
      item.id === id && (item.aromaSelecionado || null) === (aromaSelecionado || null)
        ? { ...item, quantidade: novaQtd }
        : item
    )
  );
};

const removerDoCarrinho = (id, aromaSelecionado) => {
  setItensCarrinho((prev) =>
    prev.filter(
      (item) =>
        !(
          item.id === id &&
          (item.aromaSelecionado || null) === (aromaSelecionado || null)
        )
    )
  );
};

const enviarMensagemWhatsApp = (mensagemCompleta) => {
  window.open(
    `https://wa.me/${configSite.whatsapp}?text=${encodeURIComponent(mensagemCompleta)}`,
    "_blank"
  );
};

const totalItensCarrinho = itensCarrinho.reduce(
  (acc, item) => acc + item.quantidade,
  0
);
  
  return (
  <>
    <div className="page-wrapper">

        <Header
            onCartClick={() => setCarrinhoAberto(true)}
            cartCount={totalItensCarrinho}
            onNavigate={(destino) => {
              setPaginaAtual(destino);
              if (destino === "admin") {
                setAdminResetTrigger((n) => n + 1);
              }
          }}
          paginaAtual={paginaAtual}
          usuarioLogado={usuarioLogado}
          onAuthClick={() => setAuthModalAberto(true)}
          onLogout={() => {
            setUsuarioLogado(null);
            if (paginaAtual === "admin") setPaginaAtual("home");
          }}
        />

    
      {paginaAtual === "faq" && (
        <FaqPage perguntaInicial={faqPerguntaInicial} />
      )}
            
      {paginaAtual === "home" && (
        <>
          <HeroBanner
            onExplorar={rolarParaCatalogo}
            configSite={configSite}
          />

        <CategoryFilter onSelectCategoria={(cat) => pedirWhatsApp(`Linha de ${cat}`)} />

        {/* Seção Institucional: Da natureza & do Brasil */}
        <section className="section-brasil" id="origem">
          <div className="brasil-left">
            <h2>
              Da natureza &amp; <br />
              <span className="italic">do Brasil.</span>
            </h2>
            <p>
              Alvura nasceu do desejo de criar beleza com mais presença e menos ruído. Produtos nacionais. à base de ativos vegetais eficazes, respeitando o ritmo das colheitas e o tempo de cada fórmula.
            </p>
            <p>
              Uma marca comprometida com a criaçäo de cosméticos naturais, formulados com ingredientes orgânicos, biodegradáveis e livres de substâncias agressivas.
            </p>
          </div>

          <div className="brasil-right-logo-card">
            <div className="brasil-right-logo-card">
            <img 
              src="/images/logo-alvura.png" 
              alt="Alvura Cosméticos" 
              style={{ maxWidth: '100%', width: '100%', height: 'auto' }} 
            />
          </div>
          </div>
        </section>

        {/* Biblioteca botânica — Matérias-primas */}
        <section className="section-materias" id="ingredientes">

          <div className="materias-heading">
            <span className="materias-eyebrow">
              • BIBLIOTECA BOTÂNICA
            </span>

            <div className="materias-heading-content">
              <h2>
                Nossas matérias primas
              </h2>

              <p>
                A escolha certa para carinho e aconchego na rotina.
              </p>
            </div>
          </div>

          <div className="materias-grid">

            <article className="materia-item">
              <div className="materia-image">
                <img
                  src="/assets/products/flor ver.png"
                  alt="Cerejas frescas"
                />
                <span className="materia-number">01</span>
              </div>

              <div className="materia-info">
                <h3 className="title-cereja">Cereja</h3>

                <p>
                  Notas adocicadas naturais, um aroma gentil para a pele e para o ambiente.
                </p>

                <span className="materia-tags">
                  <span className="tag-line"></span> DOÇURA · ENVOLVENTE
                </span>
              </div>
            </article>

            <article className="materia-item">
              <div className="materia-image">
                <img
                  src="/assets/products/vela avelã.png"
                  alt="Avelãs naturais"
                />
                <span className="materia-number">02</span>
              </div>

              <div className="materia-info">
                <h3 className="title-avela">Avelã</h3>

                <p>
                  Aroma envolvente que transforma qualquer ambiente, tornando-o ideal para momentos de meditação, leitura ou simplesmente para relaxar após um dia agitado.
                </p>

                <span className="materia-tags">
                  <span className="tag-line"></span> EQUILÍBRIO · PAZ
                </span>
              </div>
            </article>

            <article className="materia-item">
              <div className="materia-image">
                <img
                  src="/assets/products/mel.png"
                  alt="Mel natural"
                />
                <span className="materia-number">03</span>
              </div>

              <div className="materia-info">
                <h3 className="title-mel">Mel</h3>

                <p>
                  Aromática e acolhedora, convida ao descanso enquanto acalma a pele e transforma o cuidado em ritual.
                </p>

                <span className="materia-tags">
                  <span className="tag-line"></span> CALMA · CONFORTO
                </span>
              </div>
            </article>

            <article className="materia-item">
              <div className="materia-image">
                <img
                  src="/assets/products/vela floral.png"
                  alt="Frutas cítricas frescas"
                />
                <span className="materia-number">04</span>
              </div>

              <div className="materia-info">
                <h3 className="title-citricas">Frutas cítricas</h3>

                <p>
                  Notas de laranja e limão despertam os sentidos e renovam a sensação de frescor.
                </p>

                <span className="materia-tags">
                  <span className="tag-line"></span> VITALIDADE · FRESCOR
                </span>
              </div>
            </article>

          </div>

          <div className="materias-quote-row">
            <p>
              “Cada ingrediente entra pela eficácia e permanece pelos resultados.”
            </p>

            <a href="#acervo" className="btn-veja-mais" onClick={abrirAcervo}>
            Veja Mais <span>↗</span>
            </a>  
          </div>

        </section>

        {/* Seção Pilares: Luxo é saber o que toca a sua pele */}
        <section className="section-luxo">
          <div className="luxo-header-row">
            <div className="luxo-title-group">
              <span className="luxo-eyebrow">• O QUE GUIA CADA ESCOLHA</span>
              <h2>
                Luxo é saber o que toca a sua <br />
                pele.
              </h2>
            </div>

            <div className="luxo-badge-100">
              <strong>100%</strong>
              <span>Natural</span>
            </div>
          </div>

          <div className="pilares-grid">
            {/* Pilar 1 */}
            <div className="pilar-box">
              <div className="pilar-icon-square">
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M11 20A7 7 0 0 1 9.8 6.1C15.5 5 17 4.48 19 2c1 2 2 4.18 2 8 0 5.5-4.78 10-10 10Z"/>
                  <path d="M2 21c0-3 1.85-5.36 5.08-6C9.5 14.52 12 13 13 12"/>
                </svg>
              </div>
              <h4>Origem consciente</h4>
              <p>Ativos de procedência conhecida e parcerias próximas.</p>
            </div>

            {/* Pilar 2 */}
            <div className="pilar-box">
              <div className="pilar-icon-square">
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M10 2v7.31"/><path d="M14 9.3V1.99"/><path d="M8.5 2h7"/>
                  <path d="M14 9.3a6.5 6.5 0 1 1-4 0"/><path d="M5.52 16h12.96"/>
                </svg>
              </div>
              <h4>Fórmulas essenciais</h4>
              <p>Só o necessário para desempenho, textura e prazer.</p>
            </div>

            {/* Pilar 3 */}
            <div className="pilar-box">
              <div className="pilar-icon-square">
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M13 16a3 3 0 0 1 2.24 5"/><path d="M18 12h.01"/>
                  <path d="M18 21h-8a4 4 0 0 1-4-4 7 7 0 0 1 7-7h.2L9.6 6.4a1 1 0 1 1 2.8-2.8L15.8 7h.2c3.3 0 6 2.7 6 6v1a2 2 0 0 1-2 2h-1a3 3 0 0 0-3 3"/>
                  <path d="M20 8.54V4a2 2 0 1 0-4 0v3"/><path d="M7.612 12.524a3 3 0 1 0-1.6 4.3"/>
                </svg>
              </div>
              <h4>Sem crueldade</h4>
              <p>Nenhum teste em animais, em nenhuma etapa do processo.</p>
            </div>

            {/* Pilar 4 */}
            <div className="pilar-box">
              <div className="pilar-icon-square">
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M7 19H4.815a1.83 1.83 0 0 1-1.57-.881 1.785 1.785 0 0 1-.004-1.784L7.196 9.5"/>
                  <path d="M11 19h8.203a1.83 1.83 0 0 0 1.556-.89 1.784 1.784 0 0 0 0-1.775l-1.226-2.12"/>
                  <path d="m14 16-3 3 3 3"/><path d="M8.293 13.596 7.196 9.5 3.1 10.598"/>
                  <path d="m9.344 5.811 1.093-1.892A1.83 1.83 0 0 1 11.985 3a1.784 1.784 0 0 1 1.546.888l3.943 6.843"/>
                  <path d="m13.378 9.633 4.096 1.098 1.097-4.096"/>
                </svg>
              </div>
              <h4>Menos impacto</h4>
              <p>Vidro, refis e embalagens pensadas para permanecer.</p>
            </div>
          </div>
        </section>

        {/* Seção: Uma seleção para começar */}
        <section className="section-selecao" id="catalogo">
          <div className="selecao-header">
            <div className="selecao-title-block">
              <span className="selecao-eyebrow">• FAVORITOS DOS CONSUMIDORES</span>
              <h2>Uma seleção para começar.</h2>
              <p>Texturas que a pele reconhece, aromas que ficam na memória.</p>
            </div>

            <a href="#acervo" className="btn-outline-pill" onClick={abrirAcervo}>
            VER TODOS OS PRODUTOS <span>→</span>
            </a>
          </div>

          <div className="selecao-grid">
            {/* Card 1 */}
            <article className="selecao-card">
              <div className="selecao-img-box">
                <img 
                  src="/assets/products/cereja.png" 
                  alt="Combinações perfeitas" 
                />
                <span className="selecao-tag">MAIS AMADO</span>
                <button 
                  className="selecao-bag-btn" 
                  onClick={() => adicionarAoCarrinho({
                    id: "home-combinacoes-perfeitas",
                    nome: "Combinações perfeitas",
                    preco: 79.99,
                    tamanho: "Kit Completo",
                    imagem: "/assets/products/cereja.png"
                  })}
                  aria-label="Adicionar Combinações perfeitas"
                  >
                  <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6">
                    <path d="M6 2 3 6v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V6l-3-4Z"/><path d="M3 6h18"/><path d="M16 10a4 4 0 0 1-8 0"/>
                  </svg>
                </button>
              </div>
              <div className="selecao-info-row">
                <h3>Combinações perfeitas</h3>
                <span className="selecao-price">R$ 79,99</span>
              </div>
              <p className="selecao-desc">Hidratante + Sabonetes + Vela Aromática</p>
            </article>

            {/* Card 2 */}
            <article className="selecao-card">
              <div className="selecao-img-box">
                <img 
                  src="/assets/products/caixa.png" 
                  alt="Kit de Velas" 
                />
                <span className="selecao-tag">NOVO</span>
                <button 
                    className="selecao-bag-btn" 
                    onClick={() => adicionarAoCarrinho({
                      id: "home-kit-velas",
                      nome: "Kit de Velas",
                      preco: 132.99,
                      tamanho: "Kit",
                      imagem: "/assets/products/caixa.png"
                    })}
                    aria-label="Adicionar Kit de Velas"
                  >
                  <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6">
                    <path d="M6 2 3 6v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V6l-3-4Z"/><path d="M3 6h18"/><path d="M16 10a4 4 0 0 1-8 0"/>
                  </svg>
                </button>
              </div>
              <div className="selecao-info-row">
                <h3>Kit de Velas</h3>
                <span className="selecao-price">R$ 132,99</span>
              </div>
              <p className="selecao-desc">Aromas distintos ou iguais</p>
            </article>

            {/* Card 3 */}
            <article className="selecao-card">
              <div className="selecao-img-box">
                <img 
                  src="/assets/products/pes.png" 
                  alt="Cuidados para pés" 
                />
                <span className="selecao-tag">FAVORITO</span>
                <button 
                    className="selecao-bag-btn" 
                    onClick={() => adicionarAoCarrinho({
                      id: "home-cuidados-pes",
                      nome: "Cuidados para pés",
                      preco: 9.99,
                      tamanho: "Unidade",
                      imagem: "/assets/products/pes.png"
                    })}
                    aria-label="Adicionar Cuidados para pés"
                  >
                  <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6">
                    <path d="M6 2 3 6v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V6l-3-4Z"/><path d="M3 6h18"/><path d="M16 10a4 4 0 0 1-8 0"/>
                  </svg>
                </button>
              </div>
              <div className="selecao-info-row">
                <h3>Cuidados para pés</h3>
                <span className="selecao-price">R$ 9,99</span>
              </div>
              <p className="selecao-desc">Vendidos por unidade ou lote</p>
            </article>
          </div>

          <span className="selecao-shipping-note">FRETE GRÁTIS ACIMA DE R$ 150</span>
        </section>

        {/* Seção Feedback: Palavras de quem sente */}
        <section className="section-feedback">
          <div className="feedback-left">
            <span className="feedback-eyebrow">• PALAVRAS DE QUEM SENTE</span>
            <h2>
              Beleza que nasce da <br />
              natureza.
            </h2>

            <div className="feedback-list">
              {/* Depoimento 1 */}
              <div className="feedback-item">
                <div className="feedback-stars">☆☆☆☆☆</div>
                <p className="feedback-quote">
                  “Apaixonado nesses produtos da @alvura.cosmeticos”
                </p>
                <div className="feedback-author-row">
                  <div className="feedback-author">
                    <span className="author-avatar"></span>
                    <strong>ppoandrade</strong>
                  </div>
                  <span className="feedback-source">VIA INSTAGRAM</span>
                </div>
              </div>

              {/* Depoimento 2 */}
              <div className="feedback-item">
                <div className="feedback-stars">☆☆☆☆☆</div>
                <p className="feedback-quote">
                  “Gente, de verdade, isso aqui é coisa de mudança de vida. Deus abençoe @alvura.cosmeticos”
                </p>
                <div className="feedback-author-row">
                  <div className="feedback-author">
                    <span className="author-avatar"></span>
                    <strong>ppoandrade</strong>
                  </div>
                  <span className="feedback-source">VIA INSTAGRAM</span>
                </div>
              </div>

                {/* Depoimento 3 */}
              <div className="feedback-item">
                <div className="feedback-stars">☆☆☆☆☆</div>
                <p className="feedback-quote">
                  “❤️”
                </p>
                <div className="feedback-author-row">
                  <div className="feedback-author">
                    <span className="author-avatar"></span>
                    <strong>psi.giovannafigueiredo</strong>
                  </div>
                  <span className="feedback-source">VIA INSTAGRAM</span>
                </div>
              </div>
            </div>
          </div>

          {/* Coluna Direita: Foto da vela acesa + card flutuante */}
          <div className="feedback-right">
              <img 
                src="/images/vela.png" 
                alt="Vela Aromática Alvura acesa na mesa" 
                onError={(e) => { e.target.src = 'https://images.unsplash.com/photo-1572726729437-3732efed3f8a?q=80&w=1000&auto=format&fit=crop'; }}
              />
              <div className="feedback-floating-card">
                  <h4>Cuidado &amp; Presença reais</h4>
                  <p>
                    Compartilhe seu ritual com <br />
                    @alvura.cosmeticos
                  </p>
              </div>
          </div>
        </section>

       
      
      </>
      )}    {/*Fim da home*/}
    </div>

    {paginaAtual === "encomendas" && (
          <EncomendasPage
            onSolicitarOrcamento={(dadosParaBanco, mensagemWhatsApp) => {
              // Salva no banco de dados primeiro
              fetch('http://localhost:8080/api/encomendas', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(dadosParaBanco)
              })
              .then(res => res.json())
              .then(novaEncomendaSalva => {
                 // Atualiza a lista do Admin em tempo real
                 setEncomendasAdmin((prev) => [novaEncomendaSalva, ...prev]);
                 // Redireciona o cliente para o WhatsApp
                 pedirWhatsApp(mensagemWhatsApp);
              })
              .catch(erro => console.error("Erro ao salvar encomenda:", erro));
            }}
            onVoltarAcervo={() => {
              setPaginaAtual("acervo");
              window.scrollTo({ top: 0, behavior: "smooth" });
            }}
        />
      )}


        {paginaAtual === "acervo" && (
          <AcervoPage
            produtos={catalogoProdutos}
            onAddToCart={(produto) => adicionarAoCarrinho(produto)}
            onSelectProduto={setProdutoSelecionado}
            onAbrirEncomendas={() => {
              setPaginaAtual("encomendas");
              window.scrollTo({ top: 0, behavior: "smooth" });
            }}
          />
        )}

      {paginaAtual === "contato" && (
        <ContatoPage
          configSite={configSite}
          onWhatsAppClick={(msg) => pedirWhatsApp(msg)}
        />
      )}

     
      {paginaAtual === "admin" && usuarioLogado?.role === "admin" && (
          <AdminPage
            produtos={catalogoProdutos}
            categorias={categorias}
            onAdicionarCategoria={(novaCat) => {
              // Atualização Otimista na tela
              setCategorias((prev) =>
                prev.includes(novaCat) ? prev : [...prev, novaCat]
              );

              // Gravação no Banco de Dados
              fetch('http://localhost:8080/api/categorias', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ nome: novaCat })
              })
              .then(res => {
                if (!res.ok) throw new Error("Falha ao salvar categoria no banco.");
              })
              .catch(erro => console.error("Erro:", erro));
            }}
            onAdicionarProduto={(novo) => {
              fetch('http://localhost:8080/api/produtos', {
                  method: 'POST',
                  headers: { 'Content-Type': 'application/json' },
                  body: JSON.stringify(novo)
              })
              .then(res => {
                  if (!res.ok) throw new Error(`Código: ${res.status}`);
                  return res.json();
              })
              .then(produtoSalvoBanco => {
                  setCatalogoProdutos((prev) => [produtoSalvoBanco, ...prev]);
              })
              .catch(erro => {
                  console.error("Erro fatal ao salvar produto:", erro);
              });
            }}

            onAtualizarProduto={(atualizado) => {
              // 1. Guarda uma cópia de segurança do estado anterior (para Rollback se falhar)
              const backupCatalogo = [...catalogoProdutos];

              // 2. ATUALIZAÇÃO OTIMISTA: Muda na tela instantaneamente (0ms de espera!)
              setCatalogoProdutos((prev) =>
                prev.map((p) => (p.id === atualizado.id ? atualizado : p))
              );

              // 3. Envia a requisição em segundo plano e aguarda o "ACK" do servidor
              fetch(`http://localhost:8080/api/produtos/${atualizado.id}`, {
                method: 'PUT',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(atualizado)
              })
              .then(res => {
                if (!res.ok) throw new Error("Falha ao confirmar atualização no servidor");
                return res.json();
              })
              .then(produtoConfirmado => {
                // Sincroniza silenciosamente com o objeto exato retornado pelo banco
                setCatalogoProdutos((prev) =>
                  prev.map((p) => (p.id === produtoConfirmado.id ? produtoConfirmado : p))
                );
              })
              .catch(erro => {
                console.error("Erro ao atualizar (executando Rollback):", erro);
                // 4. ROLLBACK: Se o pacote falhou, desfaz a alteração na tela
                setCatalogoProdutos(backupCatalogo);
              });
            }}
            
            onExcluirProduto={(id) => {
              // 1. Backup para Rollback
              const backupCatalogo = [...catalogoProdutos];

              // 2. Remove da tela instantaneamente
              setCatalogoProdutos((prev) => prev.filter((p) => p.id !== id));

              // 3. Confirma a exclusão no banco em segundo plano
              fetch(`http://localhost:8080/api/produtos/${id}`, {
                method: 'DELETE'
              })
              .then(res => {
                if (!res.ok) throw new Error("Falha ao excluir no servidor");
              })
              .catch(erro => {
                console.error("Erro ao excluir (executando Rollback):", erro);
                setCatalogoProdutos(backupCatalogo);
              });
            }}
            encomendas={encomendasAdmin}
            onAtualizarStatusEncomenda={(id, novoStatus) => {
              fetch(`http://localhost:8080/api/encomendas/${id}/status`, {
                method: 'PATCH',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ status: novoStatus })
              })
              .then(() => {
                setEncomendasAdmin((prev) =>
                  prev.map((e) => (e.id === id ? { ...e, status: novoStatus } : e))
                );
              })
              .catch(erro => console.error("Erro ao atualizar status:", erro));
            }}
            configSite={configSite}
            onSalvarConfigSite={(novosDados) => {
              // 1. Backup para Rollback em caso de erro
              const backupConfig = { ...configSite };

              // 2. Atualização Otimista (reflete no site inteiro na hora)
              setConfigSite(novosDados);

              // 3. Persiste no banco de dados em segundo plano
              fetch('http://localhost:8080/api/config', {
                method: 'PUT',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(novosDados)
              })
              .then(res => {
                if (!res.ok) throw new Error("Falha ao salvar configurações");
              })
              .catch(erro => {
                console.error("Erro ao salvar config (executando Rollback):", erro);
                setConfigSite(backupConfig);
              });
            }}
            resetTrigger={adminResetTrigger}
          />
        )}

      {/* Seção Newsletter: Cartas da Alvura */}
      <section className="newsletter-gold-strip">
        <div className="newsletter-inner">
          <div className="newsletter-left">
            <span className="newsletter-eyebrow">CARTAS DA ALVURA</span>
            <h3>
              Beleza, botânica e pequenos <br />
              rituais na sua caixa de entrada.
            </h3>
          </div>

          <div className="newsletter-right">
            <form 
              className="newsletter-pill-form"
              onSubmit={(e) => {
                e.preventDefault();
                pedirWhatsApp("Quero assinar as Cartas da Alvura");
              }}
            >
              <input type="email" placeholder="Seu melhor e-mail" required />
              <button type="submit" aria-label="Inscrever">→</button>
            </form>
            <small className="newsletter-disclaimer">
              Ao assinar, você concorda em receber novidades e condições especiais. Sem excesso, como deve ser.
            </small>
          </div>
        </div>
      </section>


      {/* Footer Institucional Escuro */}
      <footer className="site-footer-dark">
        <div className="footer-dark-inner">
          <div className="footer-columns">
            {/* Coluna 1: Marca e Redes */}
            <div className="footer-brand-col">
              <div className="footer-logo-title">ALVURA</div>
              <span className="footer-logo-sub">NATURAL COSMÉTICOS</span>
              <p>
                Cosméticos botânicos para uma beleza mais presente, sensorial e consciente.
              </p>
              <div className="footer-socials">
                <a href="#instagram" aria-label="Instagram">
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6">
                    <rect x="2" y="2" width="20" height="20" rx="5" ry="5"/><path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"/><line x1="17.5" y1="6.5" x2="17.51" y2="6.5"/>
                  </svg>
                </a>
                <a href="#facebook" aria-label="Facebook">
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6">
                    <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z"/>
                  </svg>
                </a>
                <a href="#x" aria-label="X">
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6">
                    <path d="M4 4l11.733 16h4.267l-11.733 -16z"/><path d="M4 20l6.768 -6.768m2.46 -2.46l6.772 -6.772"/>
                  </svg>
                </a>
              </div>
            </div>

            
              {/* Coluna 2: Descobrir */}
              <div className="footer-links-col">
                <h5>DESCOBRIR</h5>
                <ul>
                  <li>
                    <a
                      href="#acervo"
                      onClick={(e) => navegarPara(e, "acervo")}
                    >
                      Catálogo
                    </a>
                  </li>

                  <li>
                    <a
                      href="#novidades"
                      onClick={(e) => navegarPara(e, "home", "catalogo")}
                    >
                      Novidades
                    </a>
                  </li>

                  <li>
                    <a
                      href="#ingredientes"
                      onClick={(e) => navegarPara(e, "home", "ingredientes")}
                    >
                      Diário botânico
                    </a>
                  </li>
                </ul>
              </div>

              {/* Coluna 3: Cuidado */}
              <div className="footer-links-col">
                <h5>CUIDADO</h5>
                <ul>
                  <li>
                    <a
                      href="#contato"
                      onClick={(e) => {
                        e.preventDefault();
                        pedirWhatsApp("Olá, gostaria de falar com vocês");
                      }}
                    >
                      Fale conosco
                    </a>
                  </li>

                  <li>
                    <a
                      href="#faq"
                      onClick={(e) => {
                        setFaqPerguntaInicial(1);
                        navegarPara(e, "faq");
                      }}
                    >
                      Entregas e trocas
                    </a>
                  </li>

                  <li>
                    <a
                      href="#faq"
                      onClick={(e) => {
                        setFaqPerguntaInicial(null);
                        navegarPara(e, "faq");
                      }}
                    >
                      Perguntas frequentes
                    </a>
                  </li>

                  <li>
                    <a
                      href="#faq"
                      onClick={(e) => {
                        setFaqPerguntaInicial(2);
                        navegarPara(e, "faq");
                      }}
                    >
                      Guia de reciclagem
                    </a>
                  </li>
                </ul>
              </div>


            {/* Coluna 4: Atendimento */}
            <div className="footer-links-col">
              <h5>ATENDIMENTO</h5>

              <p className="footer-email">
                {configSite.email}
              </p>

              <p className="footer-hours">
                {configSite.horarioAtendimento}
                <br />
                WhatsApp {configSite.whatsapp}
              </p>
            </div>

          {/* Marca d'água gigante */}
          <div className="footer-watermark">ALVURA</div>

          {/* Barra Inferior de Créditos */}
          
          <div className="footer-bottom-bar">
            <span>© 2026 ALVURA COSMÉTICOS. TODOS OS DIREITOS RESERVADOS.</span>

            <span>Web Design &amp; Development por Jennifer O. Checchia e Pedro Paulo O. Andrade</span>

            <div className="footer-legal-links">
              <a href="#privacidade">PRIVACIDADE</a>
              <a href="#termos">TERMOS</a>
            </div>

            <span>FEITO NO BRASIL</span>
          </div>

        </div>
      </div>

      </footer>

      <ProdutoModal
        produto={produtoSelecionado}
        onClose={() => setProdutoSelecionado(null)}
        onConfirmarPedido={(item) => {
          const aromaTexto = item.personalizacao
            ? `${item.personalizacao.aroma} | Emb: ${item.personalizacao.embalagem}${item.personalizacao.observacao ? ` (${item.personalizacao.observacao})` : ""}`
            : null;

          adicionarAoCarrinho(item, item.quantidade || 1, aromaTexto);
          setProdutoSelecionado(null);
        }}
      />

      <AuthModal
        isOpen={authModalAberto}
        onClose={() => setAuthModalAberto(false)}
        onLoginSuccess={(usuario) => {
          setUsuarioLogado(usuario);
          if (usuario.role === "admin") {
            setPaginaAtual("admin");
          }
        }}
      />

      <CartDrawer
        isOpen={carrinhoAberto}
        onClose={() => setCarrinhoAberto(false)}
        itens={itensCarrinho}
        onUpdateQuantidade={atualizarQuantidadeCarrinho}
        onRemoveItem={removerDoCarrinho}
        onClearCart={() => setItensCarrinho([])}
        onFinalizarWhatsApp={(mensagem) => {
          enviarMensagemWhatsApp(mensagem);
          setCarrinhoAberto(false);
        }}
      />

    </>
  );
}