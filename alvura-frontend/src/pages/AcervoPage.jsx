import React, { useState, useMemo } from "react";
import { PRODUTOS_MOCK } from "../data/produtosMock";
import "../styles/acervo.css";

const OPCOES_FILTRO = {
  tipos: ["Hidratante", "Vela", "Sabonete", "Escalda-pés", "Kits"],
  ingredientes: ["Cereja", "Avelã", "Mel", "Frutas cítricas"],
  disponibilidade: ["Em estoque", "Sob encomenda"],
  tamanhos: ["90g", "110g", "120g", "150g", "Kit Completo", "4x 110g"],
  precos: [
    { id: "ate-30", label: "Até R$ 30,00", min: 0, max: 30 },
    { id: "30-60", label: "R$ 30,00 a R$ 60,00", min: 30.01, max: 60 },
    { id: "acima-60", label: "Acima de R$ 60,00", min: 60.01, max: Infinity },
  ],
};

export default function AcervoPage({ onAddToCart }) {
  const [busca, setBusca] = useState("");
  const [tiposSelecionados, setTiposSelecionados] = useState([]);
  const [ingredientesSelecionados, setIngredientesSelecionados] = useState([]);
  const [dispSelecionada, setDispSelecionada] = useState([]);
  const [tamanhosSelecionados, setTamanhosSelecionados] = useState([]);
  const [precoSelecionado, setPrecoSelecionado] = useState(null);

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
    setPrecoSelecionado(null);
  };

  const produtosFiltrados = useMemo(() => {
    return PRODUTOS_MOCK.filter((prod) => {
      // 1. Pesquisa por texto
      if (
        busca.trim() !== "" &&
        !prod.nome.toLowerCase().includes(busca.toLowerCase()) &&
        !prod.tipo.toLowerCase().includes(busca.toLowerCase())
      ) {
        return false;
      }

      // 2. Tipo de produto
      if (tiposSelecionados.length > 0 && !tiposSelecionados.includes(prod.tipo)) {
        return false;
      }

      // 3. Ingredientes (verifica se o produto contém pelo menos um dos marcados)
      if (
        ingredientesSelecionados.length > 0 &&
        !ingredientesSelecionados.some((ing) => prod.ingredientes.includes(ing))
      ) {
        return false;
      }

      // 4. Disponibilidade
      if (
        dispSelecionada.length > 0 &&
        !dispSelecionada.includes(prod.disponibilidade)
      ) {
        return false;
      }

      // 5. Tamanho
      if (
        tamanhosSelecionados.length > 0 &&
        !tamanhosSelecionados.includes(prod.tamanho)
      ) {
        return false;
      }

      // 6. Faixa de preço
      if (precoSelecionado) {
        const faixa = OPCOES_FILTRO.precos.find((f) => f.id === precoSelecionado);
        if (faixa && (prod.preco < faixa.min || prod.preco > faixa.max)) {
          return false;
        }
      }

      return true;
    });
  }, [
    busca,
    tiposSelecionados,
    ingredientesSelecionados,
    dispSelecionada,
    tamanhosSelecionados,
    precoSelecionado,
  ]);

  const temFiltroAtivo =
    busca !== "" ||
    tiposSelecionados.length > 0 ||
    ingredientesSelecionados.length > 0 ||
    dispSelecionada.length > 0 ||
    tamanhosSelecionados.length > 0 ||
    precoSelecionado !== null;

  return (
    <main className="acervo-page">
      {/* Linha marrom divisória no topo igual ao rascunho */}
      <div className="acervo-top-divider" />

      <div className="acervo-layout">
        {/* SIDEBAR DE FILTROS */}
        <aside className="acervo-sidebar" aria-label="Filtros de produtos">
          {/* Bloco 1: Tipo de Produto */}
          <div className="filtro-card">
            <h3>Tipo de produto</h3>
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

          {/* Bloco 2: Ingredientes */}
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

          {/* Bloco 3: Disponibilidade */}
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

          {/* Bloco 4: Tamanho */}
          <div className="filtro-card">
            <h3>Tamanho</h3>
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

          {/* Bloco 5: Preço */}
          <div className="filtro-card">
            <h3>Preço</h3>
            {OPCOES_FILTRO.precos.map((faixa) => (
              <label key={faixa.id} className="filtro-checkbox">
                <input
                  type="checkbox"
                  checked={precoSelecionado === faixa.id}
                  onChange={() =>
                    setPrecoSelecionado(
                      precoSelecionado === faixa.id ? null : faixa.id
                    )
                  }
                />
                <span>{faixa.label}</span>
              </label>
            ))}
          </div>

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

        {/* ÁREA PRINCIPAL: PESQUISA + GRADE DE PRODUTOS */}
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
                <article key={produto.id} className="acervo-card">
                  <div className="acervo-card-img">
                    <img src={produto.imagem} alt={produto.nome} />
                  </div>

                  <div className="acervo-card-body">
                    <h3>{produto.nome}</h3>
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
                        onClick={() =>
                          onAddToCart && onAddToCart(produto)
                        }
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