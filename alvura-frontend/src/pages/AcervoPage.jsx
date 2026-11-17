import React, { useState, useMemo, useEffect } from "react";
import { PRODUTOS_MOCK } from "../data/produtosMock";
import "../styles/acervo.css";

export default function AcervoPage({
  produtos = PRODUTOS_MOCK,
  onAddToCart,
  onSelectProduto,
  onAbrirEncomendas,
}) {
  const [busca, setBusca] = useState("");
  const [tiposSelecionados, setTiposSelecionados] = useState([]);
  const [ingredientesSelecionados, setIngredientesSelecionados] = useState([]);
  const [dispSelecionada, setDispSelecionada] = useState([]);
  const [tamanhosSelecionados, setTamanhosSelecionados] = useState([]);
  
  const [precoRange, setPrecoRange] = useState({ min: 0, max: 1000 });

  const OPCOES_FILTRO = useMemo(() => {
    const tipos = new Set();
    const ingredientes = new Set();
    const disponibilidade = new Set();
    const tamanhos = new Set();
    let minPreco = Infinity;
    let maxPreco = 0;

    produtos.forEach((prod) => {
      if (prod.tipo) tipos.add(prod.tipo);
      if (prod.disponibilidade) disponibilidade.add(prod.disponibilidade);
      if (prod.tamanho) tamanhos.add(prod.tamanho);
      
      if (prod.preco < minPreco) minPreco = prod.preco;
      if (prod.preco > maxPreco) maxPreco = prod.preco;

      const listaIng = Array.isArray(prod.ingredientes)
        ? prod.ingredientes.join(", ")
        : prod.ingredientes || "";

      listaIng.split(/,|\s+e\s+|\s+&\s+/i).forEach((ing) => {
        const ingredienteLimpo = ing.trim();
        if (ingredienteLimpo) {
          const formatado =
            ingredienteLimpo.charAt(0).toUpperCase() + ingredienteLimpo.slice(1).toLowerCase();
          ingredientes.add(formatado);
        }
      });
    });

    if (minPreco === Infinity) minPreco = 0;
    if (maxPreco === 0) maxPreco = 100;

    return {
      tipos: Array.from(tipos).sort(),
      ingredientes: Array.from(ingredientes).sort(),
      disponibilidade: Array.from(disponibilidade).sort(),
      tamanhos: Array.from(tamanhos).sort(),
      minPreco: Math.floor(minPreco),
      maxPreco: Math.ceil(maxPreco),
    };
  }, [produtos]); 

  useEffect(() => {
    setPrecoRange({ min: OPCOES_FILTRO.minPreco, max: OPCOES_FILTRO.maxPreco });
  }, [OPCOES_FILTRO.minPreco, OPCOES_FILTRO.maxPreco]);

  const toggleItem = (lista, setLista, valor) => {
    setLista(
      lista.includes(valor)
        ? lista.filter((item) => item !== valor)
        : [...lista, valor]
    );
  };

  const limparFiltros = () => {
    setBusca("");
    setTiposSelecionados([]);
    setIngredientesSelecionados([]);
    setDispSelecionada([]);
    setTamanhosSelecionados([]);
    setPrecoRange({ min: OPCOES_FILTRO.minPreco, max: OPCOES_FILTRO.maxPreco });
  };

  const produtosFiltrados = useMemo(() => {
    return produtos.filter((prod) => {
      // 1. Pesquisa
      if (
        busca.trim() !== "" &&
        !prod.nome.toLowerCase().includes(busca.toLowerCase()) &&
        !prod.tipo.toLowerCase().includes(busca.toLowerCase())
      ) {
        return false;
      }

      // 2. Tipo (OU)
      if (tiposSelecionados.length > 0 && !tiposSelecionados.includes(prod.tipo)) {
        return false;
      }

      // 3. Ingredientes (Regra OR / União: precisa ter PELO MENOS UM dos ingredientes marcados)
      if (ingredientesSelecionados.length > 0) {
        const listaIngProduto = Array.isArray(prod.ingredientes)
          ? prod.ingredientes.join(", ")
          : prod.ingredientes || "";
        
        const stringComparacao = listaIngProduto.toLowerCase();

        // Trocado de .every para .some
        const possuiAlgum = ingredientesSelecionados.some((ingFiltro) => 
          stringComparacao.includes(ingFiltro.toLowerCase())
        );

        if (!possuiAlgum) return false;
      }

      // 4. Disponibilidade (OU)
      if (
        dispSelecionada.length > 0 &&
        !dispSelecionada.includes(prod.disponibilidade)
      ) {
        return false;
      }

      // 5. Tamanho (OU)
      if (
        tamanhosSelecionados.length > 0 &&
        !tamanhosSelecionados.includes(prod.tamanho)
      ) {
        return false;
      }

      // 6. Preço Range
      if (prod.preco < precoRange.min || prod.preco > precoRange.max) {
        return false;
      }

      return true;
    });
  }, [
    produtos,
    busca,
    tiposSelecionados,
    ingredientesSelecionados,
    dispSelecionada,
    tamanhosSelecionados,
    precoRange
  ]);

  const temFiltroAtivo =
    busca !== "" ||
    tiposSelecionados.length > 0 ||
    ingredientesSelecionados.length > 0 ||
    dispSelecionada.length > 0 ||
    tamanhosSelecionados.length > 0 ||
    precoRange.min > OPCOES_FILTRO.minPreco ||
    precoRange.max < OPCOES_FILTRO.maxPreco;

  const percentMin = ((precoRange.min - OPCOES_FILTRO.minPreco) / (OPCOES_FILTRO.maxPreco - OPCOES_FILTRO.minPreco)) * 100 || 0;
  const percentMax = ((precoRange.max - OPCOES_FILTRO.minPreco) / (OPCOES_FILTRO.maxPreco - OPCOES_FILTRO.minPreco)) * 100 || 100;

  return (
    <main className="acervo-page">
      <style>{`
        .thumb-only-slider::-webkit-slider-thumb {
          pointer-events: auto;
          appearance: none;
          width: 14px;
          height: 14px;
          border-radius: 50%;
          background: #7C3B00;
          cursor: pointer;
          border: 2px solid #FAF5EB;
          box-shadow: 0 1px 3px rgba(124, 59, 0, 0.4);
        }
        .thumb-only-slider::-moz-range-thumb {
          pointer-events: auto;
          width: 14px;
          height: 14px;
          border-radius: 50%;
          background: #7C3B00;
          cursor: pointer;
          border: 2px solid #FAF5EB;
          box-shadow: 0 1px 3px rgba(124, 59, 0, 0.4);
        }
        
        .price-input-box {
          width: 100%;
          padding: 8px;
          border-radius: 4px;
          border: 1px solid rgba(124, 59, 0, 0.2);
          background-color: transparent;
          font-family: inherit;
          color: #7C3B00;
          font-size: 0.9rem;
          text-align: center;
          transition: border-color 0.2s;
        }
        
        .price-input-box:focus {
          outline: none;
          border-color: #7C3B00;
        }
        
        .price-input-box::-webkit-outer-spin-button,
        .price-input-box::-webkit-inner-spin-button {
          -webkit-appearance: none;
          margin: 0;
        }
        .price-input-box[type=number] {
          -moz-appearance: textfield;
        }
      `}</style>

      <div className="acervo-top-divider" />

      <div className="acervo-layout">
        <aside className="acervo-sidebar" aria-label="Filtros de produtos">
          
          {OPCOES_FILTRO.tipos.length > 0 && (
            <div className="filtro-card">
              <h3>Categoria</h3>
              {OPCOES_FILTRO.tipos.map((tipo) => (
                <label key={tipo} className="filtro-checkbox">
                  <input
                    type="checkbox"
                    checked={tiposSelecionados.includes(tipo)}
                    onChange={() =>
                      toggleItem(tiposSelecionados, setTiposSelecionados, tipo)
                    }
                  />
                  <span>{tipo}</span>
                </label>
              ))}
            </div>
          )}

          <div className="filtro-card">
            <h3>Preço (R$)</h3>
            <div style={{ display: "flex", gap: "12px", alignItems: "center", marginBottom: "20px", color: "#7C3B00" }}>
              <input
                type="number"
                value={precoRange.min}
                min={OPCOES_FILTRO.minPreco}
                max={precoRange.max}
                onChange={(e) => setPrecoRange({ ...precoRange, min: Number(e.target.value) })}
                className="price-input-box"
              />
              <span style={{ fontSize: "0.85rem", opacity: 0.7 }}>até</span>
              <input
                type="number"
                value={precoRange.max}
                min={precoRange.min}
                max={OPCOES_FILTRO.maxPreco}
                onChange={(e) => setPrecoRange({ ...precoRange, max: Number(e.target.value) })}
                className="price-input-box"
              />
            </div>
            
            <div style={{ position: "relative", width: "100%", height: "24px" }}>
              <input
                type="range"
                min={OPCOES_FILTRO.minPreco}
                max={OPCOES_FILTRO.maxPreco}
                value={precoRange.min}
                onChange={(e) => {
                  const val = Math.min(Number(e.target.value), precoRange.max - 1);
                  setPrecoRange(prev => ({ ...prev, min: val }));
                }}
                className="thumb-only-slider"
                style={{ position: "absolute", width: "100%", zIndex: precoRange.min > OPCOES_FILTRO.maxPreco - 10 ? 5 : 3, pointerEvents: "none", appearance: "none", background: "transparent", top: "4px", left: 0 }}
              />
              <input
                type="range"
                min={OPCOES_FILTRO.minPreco}
                max={OPCOES_FILTRO.maxPreco}
                value={precoRange.max}
                onChange={(e) => {
                  const val = Math.max(Number(e.target.value), precoRange.min + 1);
                  setPrecoRange(prev => ({ ...prev, max: val }));
                }}
                className="thumb-only-slider"
                style={{ position: "absolute", width: "100%", zIndex: 4, pointerEvents: "none", appearance: "none", background: "transparent", top: "4px", left: 0 }}
              />
              <div style={{ position: "absolute", top: "10px", left: 0, right: 0, height: "3px", background: "rgba(124, 59, 0, 0.15)", borderRadius: "2px", zIndex: 1 }}></div>
              <div style={{ position: "absolute", top: "10px", height: "3px", background: "#7C3B00", borderRadius: "2px", zIndex: 2, left: `${percentMin}%`, right: `${100 - percentMax}%` }}></div>
            </div>
          </div>

          {OPCOES_FILTRO.ingredientes.length > 0 && (
            <div className="filtro-card">
              <h3>Ingredientes</h3>
              {OPCOES_FILTRO.ingredientes.map((ing) => (
                <label key={ing} className="filtro-checkbox">
                  <input
                    type="checkbox"
                    checked={ingredientesSelecionados.includes(ing)}
                    onChange={() =>
                      toggleItem(
                        ingredientesSelecionados,
                        setIngredientesSelecionados,
                        ing
                      )
                    }
                  />
                  <span>{ing}</span>
                </label>
              ))}
            </div>
          )}

          {OPCOES_FILTRO.disponibilidade.length > 0 && (
            <div className="filtro-card">
              <h3>Disponibilidade</h3>
              {OPCOES_FILTRO.disponibilidade.map((disp) => (
                <label key={disp} className="filtro-checkbox">
                  <input
                    type="checkbox"
                    checked={dispSelecionada.includes(disp)}
                    onChange={() =>
                      toggleItem(dispSelecionada, setDispSelecionada, disp)
                    }
                  />
                  <span>{disp}</span>
                </label>
              ))}
            </div>
          )}

          {OPCOES_FILTRO.tamanhos.length > 0 && (
            <div className="filtro-card">
              <h3>Tamanho / Peso</h3>
              {OPCOES_FILTRO.tamanhos.map((tam) => (
                <label key={tam} className="filtro-checkbox">
                  <input
                    type="checkbox"
                    checked={tamanhosSelecionados.includes(tam)}
                    onChange={() =>
                      toggleItem(
                        tamanhosSelecionados,
                        setTamanhosSelecionados,
                        tam
                      )
                    }
                  />
                  <span>{tam}</span>
                </label>
              ))}
            </div>
          )}

          {temFiltroAtivo && (
            <button
              type="button"
              className="btn-limpar-filtros"
              onClick={limparFiltros}
            >
              Limpar filtros
            </button>
          )}
        </aside>

        <section className="acervo-content">
          <div className="acervo-search-bar">
            <input
              type="text"
              placeholder="Pesquise aqui por nome ou categoria..."
              value={busca}
              onChange={(e) => setBusca(e.target.value)}
              aria-label="Pesquisar produtos"
            />
            {busca && (
              <button
                type="button"
                className="search-clear-btn"
                onClick={() => setBusca("")}
                aria-label="Limpar pesquisa"
              >
                ✕
              </button>
            )}
          </div>
            
          <div className="acervo-atacado-banner">
            <p>
              Vai presentear em casamentos, festas ou eventos corporativos?{" "}
              <strong>Produzimos lotes sob medida.</strong>
            </p>
            <button
              type="button"
              className="acervo-atacado-btn"
              onClick={() => onAbrirEncomendas && onAbrirEncomendas()}
            >
              Consulte condições especiais para atacado →
            </button>
          </div>

          <div className="acervo-results-meta">
            <span>
              Mostrando <strong>{produtosFiltrados.length}</strong>{" "}
              {produtosFiltrados.length === 1 ? "produto" : "produtos"}
            </span>
          </div>

          {produtosFiltrados.length === 0 ? (
            <div className="acervo-empty">
              <p>Nenhum produto encontrado com essa combinação de filtros.</p>
              <button
                type="button"
                className="btn-limpar-filtros"
                onClick={limparFiltros}
              >
                Ver todo o acervo
              </button>
            </div>
          ) : (
            <div className="acervo-grid">
              {produtosFiltrados.map((produto) => (
                <article
                key={produto.id}
                className="acervo-card"
                style={{ cursor: "pointer" }}
                onClick={() => onSelectProduto && onSelectProduto(produto)}
                >
                  <div className="acervo-card-img">
                    <img src={produto.imagem} alt={produto.nome} />
                  </div>

                  <div className="acervo-card-body">
                    <h3>{produto.nome}</h3>
                    
                    {produto.ingredientes && (
                      <span style={{
                        fontSize: "0.80rem",
                        color: "#999", 
                        display: "block",
                        marginBottom: "4px",
                        lineHeight: "1.2"
                      }}>
                        {Array.isArray(produto.ingredientes)
                          ? produto.ingredientes.join(", ")
                          : produto.ingredientes}
                      </span>
                    )}

                    <span className="acervo-card-size">{produto.tamanho}</span>
                    <p className="acervo-card-price">
                      R$ {produto.preco.toFixed(2).replace(".", ",")}
                    </p>

                    <div className="acervo-card-footer">
                      <span
                        className={`acervo-status ${
                          produto.disponibilidade === "Em estoque"
                            ? "in-stock"
                            : "on-order"
                        }`}
                      >
                        {produto.disponibilidade}
                      </span>

                      <button
                        type="button"
                        className="acervo-add-btn"
                        onClick={(e) => {
                          e.stopPropagation();
                          if (onAddToCart) {
                            onAddToCart(produto);
                          }
                        }}
                        title="Adicionar à sacola"
                        aria-label={`Adicionar ${produto.nome}`}
                      >
                        +
                      </button>
                    </div>
                  </div>
                </article>
              ))}
            </div>
          )}
        </section>
      </div>
    </main>
  );
}