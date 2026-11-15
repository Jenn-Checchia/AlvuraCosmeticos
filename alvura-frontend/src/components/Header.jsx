export default function Header({ onCartClick, onNavigate, paginaAtual }) {
  const irParaPagina = (e, destino, sectionId = null) => {
    e.preventDefault();

    if (onNavigate) {
      onNavigate(destino);
    }

    // Se houver uma âncora na Home (ex: catálogo), rola suavemente até ela
    if (destino === "home" && sectionId) {
      setTimeout(() => {
        document.getElementById(sectionId)?.scrollIntoView({
          behavior: "smooth",
        });
      }, 60);
    } else {
      window.scrollTo({ top: 0, behavior: "smooth" });
    }
  };

  return (
    <header className="topbar">
      <nav className="topbar-left" aria-label="Navegação principal">
        <a
          href="#faq"
          className={`topbar-link ${paginaAtual === "faq" ? "is-active" : ""}`}
          onClick={(e) => irParaPagina(e, "faq")}
        >
          FAQ
        </a>

        <a
          href="#origem"
          className="topbar-link"
          onClick={(e) => irParaPagina(e, "home", "origem")}
        >
          Quem somos
        </a>

        <a
          href="#contato"
          className="topbar-link"
          onClick={(e) => irParaPagina(e, "home", "contato")}
        >
          Contato
        </a>
      </nav>

      <a
        href="#inicio"
        className="topbar-logo"
        aria-label="Alvura - Página inicial"
        onClick={(e) => irParaPagina(e, "home")}
      >
        <span>ALVURA</span>
        <small>NATURAL COSMÉTICOS</small>
      </a>

      <div className="topbar-right">
        <button
          className="topbar-icon"
          type="button"
          aria-label="Pesquisar"
          onClick={(e) => irParaPagina(e, "home", "catalogo")}
        >
          <svg
            viewBox="0 0 24 24"
            width="30"
            height="30"
            fill="none"
            stroke="currentColor"
            strokeWidth="1.5"
            aria-hidden="true"
          >
            <circle cx="10.8" cy="10.8" r="6.2" />
            <path d="m15.4 15.4 4 4" />
          </svg>
        </button>

        <a
          href="#conta"
          className="topbar-link topbar-account"
          onClick={(e) => irParaPagina(e, "home", "contato")}
        >
          Minha conta
        </a>

        <button
          className="topbar-cart"
          type="button"
          onClick={onCartClick}
          aria-label="Fazer pedido"
          title="Fazer pedido pelo WhatsApp"
        >
          <svg
            viewBox="0 0 24 24"
            width="25"
            height="25"
            fill="none"
            stroke="currentColor"
            strokeWidth="1.2"
            strokeLinecap="round"
            strokeLinejoin="round"
            aria-hidden="true"
          >
            <path d="M4 8.5h16l1 11H3l1-11Z" />
            <path d="M8 8.5V6a4 4 0 0 1 8 0v2.5" />
          </svg>
        </button>
      </div>
    </header>
  );
}