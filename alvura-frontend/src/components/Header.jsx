export default function Header({
  onCartClick,
  onNavigate,
  paginaAtual,
  usuarioLogado,
  onAuthClick,
  onLogout,
}) {

  
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
          className={`topbar-link ${paginaAtual === "contato" ? "is-active" : ""}`}
          onClick={(e) => irParaPagina(e, "contato")}
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
          onClick={(e) => irParaPagina(e, "acervo")}
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

        {!usuarioLogado ? (
          <a
            href="#login"
            className="topbar-link topbar-account"
            onClick={(e) => {
              e.preventDefault();
              onAuthClick && onAuthClick();
            }}
          >
            Minha conta
          </a>
        ) : (
          <div
            className="topbar-user-area"
            style={{ display: "flex", alignItems: "center", gap: "10px" }}
          >
            <button
              type="button"
              className="topbar-link"
              style={{
                border: "none",
                background: "transparent",
                cursor: "pointer",
                fontWeight: 500,
              }}
              onClick={() => {
                if (usuarioLogado.role === "admin") {
                  onNavigate && onNavigate("admin");
                }
              }}
              title={
                usuarioLogado.role === "admin"
                  ? "Abrir painel de gestão"
                  : usuarioLogado.email
              }
            >
              Olá, {usuarioLogado.nome.split(" ")[0]}
              {usuarioLogado.role === "admin" && (
                <span
                  style={{
                    marginLeft: "6px",
                    fontSize: "0.62rem",
                    padding: "2px 7px",
                    borderRadius: "999px",
                    backgroundColor: "#7C3B00",
                    color: "#FAF5EB",
                  }}
                >
                  Admin
                </span>
              )}
            </button>
            <button
              type="button"
              onClick={onLogout}
              style={{
                border: "none",
                background: "transparent",
                color: "var(--text-muted)",
                fontSize: "0.7rem",
                textDecoration: "underline",
                cursor: "pointer",
              }}
            >
              Sair
            </button>
          </div>
        )}

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