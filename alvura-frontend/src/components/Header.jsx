export default function Header({ onCartClick }) {
  return (
    <header className="topbar">
      <nav className="topbar-left" aria-label="Navegação principal">
        <a href="#faq" className="topbar-link">
          FAQ
        </a>

        <a href="#origem" className="topbar-link">
          Quem somos
        </a>

        <a href="#contato" className="topbar-link">
          Contato
        </a>
      </nav>

      <a href="#" className="topbar-logo" aria-label="Alvura - Página inicial">
        <span>ALVURA</span>
        <small>NATURAL COSMÉTICOS</small>
      </a>

      <div className="topbar-right">
        <button
          className="topbar-icon"
          type="button"
          aria-label="Pesquisar"
          onClick={() => document.getElementById("catalogo")?.scrollIntoView({
            behavior: "smooth",
          })}
        >
          <svg
            viewBox="0 0 24 24"
            width="16"
            height="16"
            fill="none"
            stroke="currentColor"
            strokeWidth="1.5"
            aria-hidden="true"
          >
            <circle cx="10.8" cy="10.8" r="6.2" />
            <path d="m15.4 15.4 4 4" />
          </svg>
        </button>

        <a href="#contato" className="topbar-link topbar-account">
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