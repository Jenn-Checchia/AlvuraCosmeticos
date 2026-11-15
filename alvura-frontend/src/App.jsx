import Header from './components/Header';
import HeroBanner from './components/HeroBanner';
import CategoryFilter from './components/CategoryFilter';
import ProductCard from './components/ProductCard';
import { produtos } from './mockdados/produtos';
import './styles/style.css';
import FaqPage from './pages/FaqPage';
import { useState } from 'react';

const TELEFONE_ALVURA = "5567999999999";

export default function App() {

  function pedirWhatsApp(itemOuTexto) {
    const nome = typeof itemOuTexto === 'string' ? itemOuTexto : `${itemOuTexto.nome} (R$ ${itemOuTexto.preco.toFixed(2).replace('.', ',')})`;
    const texto = `Olá, Alvura! Vi no catálogo e gostaria de pedir: ${nome}`;
    window.open(`https://wa.me/${TELEFONE_ALVURA}?text=${encodeURIComponent(texto)}`, '_blank');
  }
  
  function rolarParaCatalogo() {
    document.getElementById('catalogo')?.scrollIntoView({ behavior: 'smooth' });
  }
  
  const [paginaAtual, setPaginaAtual] = useState('home');
  
  return (
  <>
    <div className="page-wrapper">

        <Header
        onCartClick={() => pedirWhatsApp("Olá! Gostaria de fazer um pedido.")}
        onNavigate={setPaginaAtual}
        paginaAtual={paginaAtual}
      />

    
      {paginaAtual === "faq" ? (
          <FaqPage />
        ) : (
        <>

        <HeroBanner onExplorar={rolarParaCatalogo} />

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
              Uma marca comprometida com a criaçäo de cosméticos naturais, formulados com ingrtedientes orgânicos, biodegradáveis e livres de substâncias agressivas.
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

            <a href="#catalogo" className="btn-veja-mais">
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

            <a href="#todos-produtos" className="btn-outline-pill">
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
                  onClick={() => pedirWhatsApp("Olá! Tenho interesse em: Combinações perfeitas (R$ 79,99)")}
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
                  onClick={() => pedirWhatsApp("Olá! Tenho interesse no: Kit de Velas (R$ 132,99)")}
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
                  onClick={() => pedirWhatsApp("Olá! Tenho interesse em: Cuidados para pés (R$ 9,99)")}
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
                <li><a href="#catalogo">Catálogo</a></li>
                <li><a href="#materias">Ingredientes</a></li>
                <li><a href="#novidades">Novidades</a></li>
              </ul>
            </div>

            {/* Coluna 3: Alvura */}
            <div className="footer-links-col">
              <h5>ALVURA</h5>
              <ul>
                <li><a href="#origem">Nossa história</a></li>
                <li><a href="#pilares">Compromissos</a></li>
                <li><a href="#diario">Diário botânico</a></li>
                <li><a href="#carreiras">Trabalhe conosco</a></li>
              </ul>
            </div>

            {/* Coluna 4: Cuidado */}
            <div className="footer-links-col">
              <h5>CUIDADO</h5>
              <ul>
                <li><a href="#contato" onClick={() => pedirWhatsApp("Olá, gostaria de falar com vocês")}>Fale conosco</a></li>
                <li><a href="#entregas">Entregas e trocas</a></li>
                <li><a href="#faq">Perguntas frequentes</a></li>
                <li><a href="#reciclagem">Guia de reciclagem</a></li>
              </ul>
            </div>

            {/* Coluna 5: Atendimento */}
            <div className="footer-links-col">
              <h5>ATENDIMENTO</h5>
              <p className="footer-email">oi@alvura.com.br</p>
              <p className="footer-hours">
                Seg–sex, das 9h às 18h <br />
                WhatsApp (11) 4002-2026
              </p>
            </div>
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
      </footer>
    </>
  );
}