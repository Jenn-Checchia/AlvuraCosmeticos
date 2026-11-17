export default function Header({
  onCartClick,
  cartCount = 0, // <-- Adicione aqui
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
            className="topbar-link"
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
            style={{ display: "flex", alignItems: "center", gap: "12px" }}
          >
            {usuarioLogado.role === "admin" ? (
              <button
                type="button"
                onClick={() => {
                  onNavigate && onNavigate("admin");
                  window.scrollTo({ top: 0, behavior: "smooth" });
                }}
                style={{
                  padding: "8px 18px",
                  borderRadius: "999px",
                  border: "1px solid #C99E38",
                  backgroundColor: "#7C3B00",
                  color: "#FAF5EB",
                  fontSize: "0.78rem",
                  fontWeight: 500,
                  letterSpacing: "0.03em",
                  cursor: "pointer",
                  whiteSpace: "nowrap",
                  boxShadow: "0 4px 12px rgba(124, 59, 0, 0.18)",
                }}
                title="Voltar ao Portal do Administrador"
              >
                ✦ Área do Administrador
              </button>
            ) : (
              <span className="topbar-link" style={{ fontWeight: 500 }}>
                Olá, {usuarioLogado.nome.split(" ")[0]}
              </span>
            )}

            <button
              type="button"
              onClick={onLogout}
              style={{
                border: "none",
                background: "transparent",
                color: "var(--text-muted)",
                fontSize: "0.75rem",
                textDecoration: "underline",
                cursor: "pointer",
              }}
            >
              Sair
            </button>
          </div>
        )}


        <button
          type="button"
          className="header-cart-btn"
          onClick={onCartClick}
          aria-label="Abrir sacola de compras"
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
        {cartCount > 0 && (
        <span className="cart-badge">{cartCount}</span>
       )}
      </button>
          
      </div>

    </header>
  );
}