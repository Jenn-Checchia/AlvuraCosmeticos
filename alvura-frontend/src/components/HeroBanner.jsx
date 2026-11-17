
export default function HeroBanner({ onExplorar, configSite }) {
  return (
    <section className="hero-grid">
      <div className="hero-left">
        <div className="hero-title-block">
          <div className="hero-eyebrow">
            <span></span>
            <small>COLEÇÃO SENSORIAL · 2026</small>
          </div>

          <h1>
            {configSite?.heroTitulo || "Catálogo"}
            <span>Alvura</span>
          </h1>

          <p>
            {configSite?.heroSubtitulo ||
              "Beleza que nasce da Natureza. Descubra uma nova forma de cuidar de si."}
          </p>

          <button
            className="btn-dark-pill"
            type="button"
            onClick={onExplorar}
          >
            EXPLORAR CATÁLOGO
            <span aria-hidden="true">↗</span>
          </button>
        </div>

        <div className="hero-mini-card">
          <span className="hero-mini-line"></span>

          <div>
            <h2>Sem pressa</h2>
            <p>FEITO EM PEQUENOS LOTES</p>
          </div>
        </div>
      </div>

      {/* Área da imagem e elementos flutuantes */}
      <div className="hero-image-wrapper">
        <img
          src={
            configSite?.imagemHero ||
            "/assets/products/vela cereja.png"
          }
          alt="Produtos Alvura em uma composição com ingredientes naturais"
        />

        <span className="pill-tag-top">
          RITUAL Nº 01
        </span>

        <div className="circle-badge-floating">
          <span>
            Beleza &amp;
            <br />
            sustentabilidade
            <small>✳</small>
          </span>
        </div>
      </div>
    </section>
  );
}
