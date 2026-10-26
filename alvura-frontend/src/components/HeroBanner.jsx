export default function HeroBanner({ onExplorar }) {
  return (
    <section className="hero-grid">
      <div className="hero-left">
        <div className="hero-title-block">
          <div className="hero-eyebrow">
            <span></span>
            <small>COLEÇÃO SENSORIAL · 2026</small>
          </div>

          <h1>
            Catálogo
            <span>Alvura</span>
          </h1>

          <p>
            Beleza que nasce da Natureza.
            <br />
            Descubra uma nova forma de cuidar de si.
            <br />
            Descubra Alvura.
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

      <div className="hero-right">
        <img
          src="/assets/products/vela cereja.png"
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