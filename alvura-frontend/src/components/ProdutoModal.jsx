import React, { useState, useEffect } from "react";
import "../styles/produtoModal.css";

export default function ProdutoModal({ produto, onClose, onConfirmarPedido }) {
  const [quantidade, setQuantidade] = useState(1);
  const [aromaEscolhido, setAromaEscolhido] = useState("");
  const [embalagem, setEmbalagem] = useState("Padrão Alvura (com fita)");
  const [observacao, setObservacao] = useState("");

  // Reseta os campos sempre que um novo produto for aberto
  useEffect(() => {
    if (produto) {
      setQuantidade(1);
      setAromaEscolhido(produto.opcoesAroma?.[0] || "");
      setEmbalagem("Padrão Alvura (com fita)");
      setObservacao("");
    }
  }, [produto]);

  // Fecha com a tecla ESC
  useEffect(() => {
    const handleEsc = (e) => {
      if (e.key === "Escape") onClose();
    };
    window.addEventListener("keydown", handleEsc);
    return () => window.removeEventListener("keydown", handleEsc);
  }, [onClose]);

  if (!produto) return null;

  const isEncomenda =
    produto.disponibilidade === "Sob encomenda" || produto.personalizavel;

  const subtotal = (produto.preco * quantidade).toFixed(2).replace(".", ",");

  const handleConfirmar = (e) => {
    e.preventDefault();
    const itemPedido = {
      ...produto,
      quantidade,
      personalizacao: isEncomenda
        ? {
            aroma: aromaEscolhido,
            embalagem,
            observacao: observacao.trim(),
          }
        : null,
    };

    if (onConfirmarPedido) {
      onConfirmarPedido(itemPedido);
    }
    onClose();
  };

  return (
    <div
      className="modal-backdrop"
      onClick={onClose}
      role="dialog"
      aria-modal="true"
      aria-labelledby="modal-produto-titulo"
    >
      <div className="modal-card" onClick={(e) => e.stopPropagation()}>
        <button
          type="button"
          className="modal-close-btn"
          onClick={onClose}
          aria-label="Fechar janela"
        >
          ✕
        </button>

        <div className="modal-grid">
          {/* Coluna Esquerda: Foto do Produto */}
          <div className="modal-img-col">
            <div className="modal-img-frame">
              <img src={produto.imagem} alt={produto.nome} />
            </div>
            <div className="modal-badges">
              <span className="modal-badge">{produto.tipo}</span>
              <span className="modal-badge">{produto.tamanho}</span>
              <span
                className={`modal-badge ${
                  isEncomenda ? "badge-encomenda" : "badge-estoque"
                }`}
              >
                {produto.disponibilidade}
              </span>
            </div>
          </div>

          {/* Coluna Direita: Detalhes + Personalização */}
          <form className="modal-info-col" onSubmit={handleConfirmar}>
            <h2 id="modal-produto-titulo">{produto.nome}</h2>
            <p className="modal-price">
              R$ {produto.preco.toFixed(2).replace(".", ",")}
            </p>

            <p className="modal-desc">{produto.descricao}</p>

            {produto.ingredientes?.length > 0 && (
              <p className="modal-ingredients">
                <strong>Notas & Ativos:</strong>{" "}
                {produto.ingredientes.join(" • ")}
              </p>
            )}

            {/* BLOCO DE PERSONALIZAÇÃO (Aparece para Sob Encomenda / Kits) */}
            {isEncomenda && (
              <div className="modal-custom-box">
                <span className="custom-box-title">
                  ✦ Personalize sua encomenda
                </span>

                {produto.opcoesAroma?.length > 0 && (
                  <label className="modal-field">
                    <span>Escolha o aroma</span>
                    <select
                      value={aromaEscolhido}
                      onChange={(e) => setAromaEscolhido(e.target.value)}
                    >
                      {produto.opcoesAroma.map((aroma) => (
                        <option key={aroma} value={aroma}>
                          {aroma}
                        </option>
                      ))}
                    </select>
                  </label>
                )}

                <label className="modal-field">
                  <span>Acabamento / Embalagem</span>
                  <select
                    value={embalagem}
                    onChange={(e) => setEmbalagem(e.target.value)}
                  >
                    <option value="Padrão Alvura (com fita)">
                      Padrão Alvura (com fita)
                    </option>
                    <option value="Presente (com cartão manuscrito)">
                      Presente (com cartão manuscrito)
                    </option>
                    <option value="Minimalista (sem caixa externa)">
                      Minimalista (sem caixa externa)
                    </option>
                  </select>
                </label>

                <label className="modal-field">
                  <span>Mensagem no cartão ou observação (opcional)</span>
                  <textarea
                    rows="2"
                    placeholder="Ex: Escrever 'Com carinho' no cartão, ou especificar aromas..."
                    value={observacao}
                    onChange={(e) => setObservacao(e.target.value)}
                  />
                </label>
              </div>
            )}

            {/* Rodapé: Quantidade + Botão de Confirmar */}
            <div className="modal-actions-row">
              <div className="qty-selector" aria-label="Quantidade">
                <button
                  type="button"
                  onClick={() => setQuantidade((q) => Math.max(1, q - 1))}
                >
                  −
                </button>
                <span>{quantidade}</span>
                <button
                  type="button"
                  onClick={() => setQuantidade((q) => q + 1)}
                >
                  +
                </button>
              </div>

              <button type="submit" className="modal-submit-btn">
                {isEncomenda
                  ? `Encomendar • R$ ${subtotal}`
                  : `Adicionar à sacola • R$ ${subtotal}`}
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}