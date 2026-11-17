import React, { useState } from "react";
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
  const [enderecoEntrega, setEnderecoEntrega] = useState("");
  const [erroEndereco, setErroEndereco] = useState(false);

  if (!isOpen) return null;

  const subtotal = itens.reduce(
    (acc, item) => acc + item.preco * item.quantidade,
    0
  );

  const formatarPreco = (valor) =>
    `R$ ${valor.toFixed(2).replace(".", ",")}`;

  const handleFinalizarPedido = () => {
    if (itens.length === 0) return;

    // Validação do endereço
    if (!enderecoEntrega.trim()) {
      setErroEndereco(true);
      return; // Impede o envio se o endereço estiver vazio
    }
    setErroEndereco(false);

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
      `*Endereço de Entrega:*`,
      `${enderecoEntrega.trim()}`,
      "",
      `*Subtotal:* ${formatarPreco(subtotal)}`,
      `*Frete:* A calcular no atendimento`,
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
            {(() => {
              const totalItens = itens.reduce((acc, i) => acc + i.quantidade, 0);
              return <h2>Sua Sacola{totalItens > 0 ? ` (${totalItens})` : ""}</h2>;
            })()}
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
            
            {/* Campo de Endereço Adicionado Aqui */}
            <div className="cart-address-box">
              <label htmlFor="cart-address" style={{ display: "block", marginBottom: "8px", fontSize: "0.85rem", color: erroEndereco ? "#D32F2F" : "inherit" }}>
                Endereço de entrega (Obrigatório)*
              </label>
              <textarea 
                id="cart-address"
                rows="2" 
                placeholder="Rua, Número, Bairro, Cidade, CEP..."
                value={enderecoEntrega}
                onChange={(e) => {
                  setEnderecoEntrega(e.target.value);
                  if (erroEndereco && e.target.value.trim().length > 0) {
                     setErroEndereco(false);
                  }
                }}
                style={{ 
                  width: "100%", 
                  padding: "10px", 
                  borderRadius: "4px", 
                  border: erroEndereco ? "1px solid #D32F2F" : "1px solid #ccc",
                  backgroundColor: erroEndereco ? "#FFEBEE" : "#fff",
                  fontFamily: "inherit",
                  resize: "vertical"
                }}
              />
              {erroEndereco && (
                <span style={{ color: "#D32F2F", fontSize: "0.75rem", marginTop: "4px", display: "block" }}>
                  Por favor, informe o endereço para o cálculo do frete.
                </span>
              )}
            </div>
            {/* Fim do Campo de Endereço */}

            <div className="cart-summary-row" style={{ marginTop: "16px" }}>
              <span>Subtotal</span>
              <strong>{formatarPreco(subtotal)}</strong>
            </div>
            <div className="cart-summary-row small">
              <span>Entrega</span>
              <span>Calculado no atendimento</span>
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