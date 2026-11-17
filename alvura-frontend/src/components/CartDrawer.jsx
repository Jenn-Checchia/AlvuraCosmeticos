import React from "react";
import "../styles/cart.css";

export default function CartDrawer({
  isOpen,
  onClose,
  itens = [],
  onUpdateQuantidade,
  onRemoveItem,
  onClearCart,
  onFinalizarWhatsApp,
}) {
  if (!isOpen) return null;

  const subtotal = itens.reduce(
    (acc, item) => acc + item.preco * item.quantidade,
    0
  );

  const metaFreteGratis = 150;
  const faltaParaFrete = Math.max(0, metaFreteGratis - subtotal);
  const progressoFrete = Math.min(100, (subtotal / metaFreteGratis) * 100);

  const formatarPreco = (valor) =>
    `R$ ${valor.toFixed(2).replace(".", ",")}`;

  const handleFinalizarPedido = () => {
    if (itens.length === 0) return;

    const linhasItens = itens.map(
      (item) =>
        `• ${item.quantidade}x ${item.nome} (${item.tamanho})${
          item.aromaSelecionado ? ` - Aroma: ${item.aromaSelecionado}` : ""
        } — ${formatarPreco(item.preco * item.quantidade)}`
    );

    const mensagem = [
      "Olá, Alvura! Gostaria de finalizar meu pedido:",
      "",
      ...linhasItens,
      "",
      `*Subtotal:* ${formatarPreco(subtotal)}`,
      `*Frete:* ${
        faltaParaFrete === 0
          ? "Grátis (pedido acima de R$ 150)"
          : "A calcular conforme CEP"
      }`,
    ].join("\n");

    if (onFinalizarWhatsApp) {
      onFinalizarWhatsApp(mensagem);
    }
  };

  return (
    <div className="cart-overlay" onClick={onClose} role="dialog" aria-modal="true" aria-label="Sacola de compras">
      <aside className="cart-drawer" onClick={(e) => e.stopPropagation()}>
        {/* Cabeçalho */}
        <header className="cart-header">
          <div>
            <span className="cart-eyebrow">ALVURA COSMÉTICOS</span>
            <h2>Sua Sacola ({itens.reduce((acc, i) => acc + i.quantidade, 0)})</h2>
          </div>
          <button
            type="button"
            className="cart-close-btn"
            onClick={onClose}
            aria-label="Fechar sacola"
          >
            ✕
          </button>
        </header>

        {/* Barra de Frete Grátis (Regra do FAQ) */}
        <div className="cart-shipping-bar">
          {faltaParaFrete > 0 ? (
            <p>
              Faltam <strong>{formatarPreco(faltaParaFrete)}</strong> para você
              ganhar <strong>Frete Grátis</strong>
            </p>
          ) : (
            <p className="shipping-unlocked">
              Você desbloqueou <strong>Frete Grátis</strong> para todo o Brasil!
            </p>
          )}
          <div className="shipping-progress-track">
            <div
              className="shipping-progress-fill"
              style={{ width: `${progressoFrete}%` }}
            />
          </div>
        </div>

        {/* Lista de Produtos */}
        <div className="cart-body">
          {itens.length === 0 ? (
            <div className="cart-empty">
              <p>Sua sacola botânica ainda está vazia.</p>
              <span>
                Explore nosso acervo de velas, sabonetes e hidratantes
                artesanais.
              </span>
              <button
                type="button"
                className="cart-continue-btn"
                onClick={onClose}
              >
                Explorar acervo
              </button>
            </div>
          ) : (
            <ul className="cart-items-list">
              {itens.map((item) => {
                const chaveUnica = `${item.id}-${item.aromaSelecionado || "padrao"}`;
                return (
                  <li key={chaveUnica} className="cart-item">
                    <img
                      src={item.imagem}
                      alt={item.nome}
                      className="cart-item-img"
                    />
                    <div className="cart-item-info">
                      <div className="cart-item-top">
                        <h3>{item.nome}</h3>
                        <button
                          type="button"
                          className="cart-remove-btn"
                          onClick={() =>
                            onRemoveItem(item.id, item.aromaSelecionado)
                          }
                          title="Remover item"
                        >
                          Remover
                        </button>
                      </div>
                      <span className="cart-item-meta">
                        {item.tamanho}
                        {item.aromaSelecionado && ` • ${item.aromaSelecionado}`}
                      </span>

                      <div className="cart-item-bottom">
                        <div className="cart-qty-control">
                          <button
                            type="button"
                            onClick={() =>
                              onUpdateQuantidade(
                                item.id,
                                item.aromaSelecionado,
                                item.quantidade - 1
                              )
                            }
                            aria-label="Diminuir quantidade"
                          >
                            −
                          </button>
                          <span>{item.quantidade}</span>
                          <button
                            type="button"
                            onClick={() =>
                              onUpdateQuantidade(
                                item.id,
                                item.aromaSelecionado,
                                item.quantidade + 1
                              )
                            }
                            aria-label="Aumentar quantidade"
                          >
                            +
                          </button>
                        </div>

                        <strong className="cart-item-price">
                          {formatarPreco(item.preco * item.quantidade)}
                        </strong>
                      </div>
                    </div>
                  </li>
                );
              })}
            </ul>
          )}
        </div>

        {/* Rodapé e Resumo */}
        {itens.length > 0 && (
          <footer className="cart-footer">
            <div className="cart-summary-row">
              <span>Subtotal</span>
              <strong>{formatarPreco(subtotal)}</strong>
            </div>
            <div className="cart-summary-row small">
              <span>Entrega</span>
              <span>
                {faltaParaFrete === 0 ? "Grátis" : "Calculado no atendimento"}
              </span>
            </div>

            <button
              type="button"
              className="cart-checkout-btn"
              onClick={handleFinalizarPedido}
            >
              Finalizar pedido pelo WhatsApp
            </button>

            {onClearCart && (
              <button
                type="button"
                className="cart-clear-link"
                onClick={onClearCart}
              >
                Esvaziar sacola
              </button>
            )}
          </footer>
        )}
      </aside>
    </div>
  );
}