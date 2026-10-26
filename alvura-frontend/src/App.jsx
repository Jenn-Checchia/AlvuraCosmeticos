import Header from './components/Header';
import HeroBanner from './components/HeroBanner';
import CategoryFilter from './components/CategoryFilter';
import ProductCard from './components/ProductCard';
import { produtos } from './mockdados/produtos';
import './styles/style.css';

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

  return (
    <div className="page-wrapper">
      <Header onCartClick={() => pedirWhatsApp("Itens do Catálogo")} />

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
            A Alvura nasce do desejo de criar cosméticos artesanais honestos, com tempo de cura respeitado e matérias-primas vegetais selecionadas.
          </p>
          <p>
            Fórmulas feitas à mão com ingredientes biodegradáveis, livres de parabenos e longe de substâncias agressivas.
          </p>
        </div>

        <div className="brasil-right-logo-card">
          <svg className="alvura-sun-svg" viewBox="0 0 200 110" fill="none">
            <path d="M50 100 C50 65, 150 65, 150 100 Z" fill="var(--color-sun-gold)" />
            <g stroke="var(--color-sun-gold)" strokeWidth="2.5" strokeLinecap="round">
              <line x1="100" y1="55" x2="100" y2="10" />
              <line x1="115" y1="58" x2="130" y2="15" />
              <line x1="130" y1="65" x2="158" y2="28" />
              <line x1="142" y1="76" x2="180" y2="50" />
              <line x1="148" y1="88" x2="192" y2="75" />
              <line x1="85" y1="58" x2="70" y2="15" />
              <line x1="70" y1="65" x2="42" y2="28" />
              <line x1="58" y1="76" x2="20" y2="50" />
              <line x1="52" y1="88" x2="8" y2="75" />
            </g>
          </svg>
          <div className="alvura-brand-title">ALVURA</div>
          <div className="alvura-brand-sub">COSMÉTICOS</div>
        </div>
      </section>

            {/* Biblioteca botânica — Matérias-primas */}
      <section className="section-materias" id="ingredientes">

        <div className="materias-heading">
          <span className="materias-eyebrow">
            Biblioteca botânica
          </span>

          <div className="materias-heading-content">
            <h2>
              Nossas matérias-primas
            </h2>

            <p>
              Ingredientes escolhidos para transformar
              pequenos gestos em momentos especiais.
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
              <h3>Cereja</h3>

              <p>
                Notas adocicadas naturais, um aroma gentil
                para a pele e para o ambiente.
              </p>

              <span className="materia-tags">
                Doçura · Envolvente
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
              <h3>Avelã</h3>

              <p>
                Aroma envolvente que transforma qualquer
                ambiente em um convite ao relaxamento.
              </p>

              <span className="materia-tags">
                Equilíbrio · Paz
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
              <h3>Mel</h3>

              <p>
                Uma presença aromática acolhedora que
                convida ao descanso e ao cuidado.
              </p>

              <span className="materia-tags">
                Calma · Conforto
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
              <h3>Frutas cítricas</h3>

              <p>
                Notas de laranja e limão despertam os
                sentidos e renovam a sensação de frescor.
              </p>

              <span className="materia-tags">
                Vitalidade · Frescor
              </span>
            </div>
          </article>

        </div>

        <div className="materias-quote">
          <p>
            “Cada ingrediente entra pela eficácia
            e permanece pelos resultados.”
          </p>
        </div>

      </section>

      {/* Seção Pilares: Luxo é saber o que toca a sua pele */}
      <section className="section-luxo">
        <div className="luxo-left">
          <h2>
            Luxo é saber o que toca a sua <span className="italic">pele.</span>
          </h2>

          <div className="pilares-grid">
            <div className="pilar-box">
              <h4>Origem consciente</h4>
              <p>Insumos vegetais rastreáveis e óleos naturais extraídos a frio.</p>
            </div>
            <div className="pilar-box">
              <h4>Fórmulas essenciais</h4>
              <p>Apenas o que nutre, hidrata e perfuma com suavidade real.</p>
            </div>
            <div className="pilar-box">
              <h4>Sem crueldade</h4>
              <p>Nenhum teste em animais em nenhuma etapa da nossa produção.</p>
            </div>
            <div className="pilar-box">
              <h4>Menos impacto</h4>
              <p>Potes de vidro reutilizáveis e embalagens pensadas para durar.</p>
            </div>
          </div>
        </div>

        <div className="luxo-right-img">
          <img src="/assets/products/vela cereja.png" alt="Vela Alvura" />
        </div>
      </section>

      {/* Vitrine usando o componente ProductCard */}
      <section className="section-selecao" id="catalogo">
        <div className="selecao-top">
          <h2>
            Uma seleção <span className="italic">para começar.</span>
          </h2>
        </div>

        <div className="selecao-grid">
          {produtos.map((produto) => (
            <ProductCard 
              key={produto.id} 
              produto={produto} 
              onPedir={pedirWhatsApp} 
            />
          ))}
        </div>
      </section>

      {/* Prova Social / Mural */}
      <section className="section-mural">
        <div className="mural-center-title">
          <h2>
            Beleza que nasce da <span className="italic">natureza.</span>
          </h2>
        </div>

        <div className="mural-cards-collage">
          <div className="social-card">
            <p>“Apaixonado nesses produtos da @alvura.cosmeticos”</p>
            <small>Via Instagram</small>
          </div>

          <div className="social-card">
            <p>“Gente, de verdade, isso aqui é coisa de mudança de vida. Deus abençoe @alvura.cosmeticos”</p>
            <small>Cliente verificada</small>
          </div>
        </div>
      </section>

      {/* Footer Banner */}
      <footer className="footer-candle-banner">
        <img 
          className="bg-candle" 
          src="/assets/products/caixa.png" 
          alt="Vela acesa na mesa" 
        />
        <div className="footer-banner-content">
          <div className="footer-newsletter-right">
            <h3>
              Beleza, botânica e pequenos <span className="italic">rituais</span> na sua caixa de entrada.
            </h3>
            <div className="newsletter-input-group">
              <input type="email" placeholder="Seu melhor e-mail" />
              <button onClick={() => pedirWhatsApp("Quero entrar na lista VIP Alvura")}>Inscrever</button>
            </div>
          </div>

          <div className="footer-white-box">
            <h4>Cuidado &amp; Presença reais</h4>
            <p>Feito artesanalmente no Brasil • Alvura Cosméticos</p>
          </div>
        </div>
      </footer>
    </div>
  );
}