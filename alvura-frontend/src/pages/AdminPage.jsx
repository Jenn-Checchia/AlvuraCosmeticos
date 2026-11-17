import React, { useState, useEffect } from "react";
import "../styles/admin.css";


const IMAGENS_PADRAO = [
    { label: "Caixa / Kit", path: "/assets/products/caixa.png" },
    { label: "Vela Avelã", path: "/assets/products/vela avelã.png" },
    { label: "Sabonete Flor Vermelha", path: "/assets/products/flor ver.png" },
    { label: "Mel & Camomila", path: "/assets/products/mel.png" },
    { label: "Vela Floral", path: "/assets/products/vela floral.png" },
    { label: "Cuidados Pés", path: "/assets/products/cuidados-pes.png" },
    { label: "Kit Velas", path: "/assets/products/kit-velas.png" },
];

export default function AdminPage({
    produtos,
    categorias,
    onAdicionarCategoria,
    onAdicionarProduto,
    onAtualizarProduto,
    onExcluirProduto,
    encomendas,
    onAtualizarStatusEncomenda,
    configSite,
    onSalvarConfigSite,
    resetTrigger,
}) {
    
    const [abaAtual, setAbaAtual] = useState("portal"); // "portal" | "catalogo" | "encomendas" | "editar"
    const [filtroStatusEncomenda, setFiltroStatusEncomenda] = useState("Todos");

  // Sempre que clicar em "Área do Administrador" no Header, retorna ao Portal vinho
  useEffect(() => {
    setAbaAtual("portal");
  }, [resetTrigger]);

  // --- Estados do Catálogo & Nova Categoria ---
  const [formProd, setFormProd] = useState({
    nome: "",
    tipo: categorias[0] || "Vela",
    preco: "",
    tamanho: "110g",
    disponibilidade: "Em estoque",
    ingredientesTexto: "Cereja, Avelã",
    descricao: "",
    imagem: "/assets/products/vela floral.png",
    personalizavel: false,
  });
  const [editandoId, setEditandoId] = useState(null);
  const [buscaProd, setBuscaProd] = useState("");
  const [criandoCategoria, setCriandoCategoria] = useState(false);
  const [novaCategoriaNome, setNovaCategoriaNome] = useState("");
  const [feedback, setFeedback] = useState("");

  // --- Estados da Edição de Dados do Site ---
  const [formSite, setFormSite] = useState(configSite);
  useEffect(() => {
    setFormSite(configSite);
  }, [configSite]);

  const mostrarFeedback = (msg) => {
    setFeedback(msg);
    setTimeout(() => setFeedback(""), 3200);
  };

  const handleCriarCategoria = () => {
    const limpa = novaCategoriaNome.trim();
    if (!limpa) return;
    onAdicionarCategoria(limpa);
    setFormProd((prev) => ({ ...prev, tipo: limpa }));
    setNovaCategoriaNome("");
    setCriandoCategoria(false);
    mostrarFeedback(`Categoria "${limpa}" criada com sucesso!`);
  };

  const handleUploadImagemProduto = async (e) => {
    const file = e.target.files?.[0];
    if (!file) return;

    mostrarFeedback("Enviando imagem...");
    const formData = new FormData();
    formData.append("file", file);

    try {
      const res = await fetch("http://localhost:8080/api/upload", {
        method: "POST",
        body: formData,
      });

      if (!res.ok) throw new Error("Falha no upload");
      
      const data = await res.json();
      setFormProd((prev) => ({ ...prev, imagem: data.url }));
      mostrarFeedback("Imagem do produto carregada!");
    } catch (error) {
      console.error("Erro no upload:", error);
      mostrarFeedback("Erro ao carregar a imagem.");
    }
  };

  const handleUploadImagemSite = async (e, campo) => {
    const file = e.target.files?.[0];
    if (!file) return;

    mostrarFeedback("Enviando imagem...");
    const formData = new FormData();
    formData.append("file", file);

    try {
      const res = await fetch("http://localhost:8080/api/upload", {
        method: "POST",
        body: formData,
      });

      if (!res.ok) throw new Error("Falha no upload");
      
      const data = await res.json();
      setFormSite((prev) => ({ ...prev, [campo]: data.url }));
      mostrarFeedback("Imagem do site carregada!");
    } catch (error) {
      console.error("Erro no upload:", error);
      mostrarFeedback("Erro ao carregar a imagem.");
    }
  };

  const iniciarEdicaoProduto = (produto) => {
    setEditandoId(produto.id);
    setFormProd({
      nome: produto.nome,
      tipo: produto.tipo,
      preco: String(produto.preco),
      tamanho: produto.tamanho,
      disponibilidade: produto.disponibilidade,
      ingredientesTexto: (produto.ingredientes || []).join(", "),
      descricao: produto.descricao || "",
      imagem: produto.imagem,
      personalizavel: Boolean(produto.personalizavel),
    });
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const cancelarEdicaoProduto = () => {
    setEditandoId(null);
    setFormProd({
      nome: "",
      tipo: categorias[0] || "Vela",
      preco: "",
      tamanho: "110g",
      disponibilidade: "Em estoque",
      ingredientesTexto: "Cereja, Avelã",
      descricao: "",
      imagem: "/assets/products/vela floral.png",
      personalizavel: false,
    });
  };

  const handleSubmitProduto = (e) => {
    e.preventDefault();
    const precoNum = parseFloat(String(formProd.preco).replace(",", "."));
    if (!formProd.nome.trim() || isNaN(precoNum) || precoNum <= 0) {
      mostrarFeedback("Informe um nome e um preço válido.");
      return;
    }

    const dados = {
      nome: formProd.nome.trim(),
      tipo: formProd.tipo,
      preco: precoNum,
      tamanho: formProd.tamanho.trim() || "Unidade",
      disponibilidade: formProd.disponibilidade,
      ingredientes: formProd.ingredientesTexto
        .split(",")
        .map((i) => i.trim())
        .filter(Boolean),
      descricao:
        formProd.descricao.trim() ||
        "Produzido artesanalmente com matérias-primas botânicas selecionadas.",
      imagem: formProd.imagem,
      personalizavel:
        formProd.personalizavel || formProd.disponibilidade === "Sob encomenda",
      opcoesAroma:
        formProd.personalizavel || formProd.disponibilidade === "Sob encomenda"
          ? ["Cereja e Avelã", "Mel e Camomila", "Patchouli Floral"]
          : undefined,
    };

    if (editandoId !== null) {
      onAtualizarProduto({ ...dados, id: editandoId });
      mostrarFeedback("Produto atualizado com sucesso!");
    } else {
      onAdicionarProduto(dados);
      mostrarFeedback("Produto cadastrado no catálogo!");
    }
    cancelarEdicaoProduto();
  };

  const handleSalvarDadosSite = (e) => {
    e.preventDefault();
    onSalvarConfigSite(formSite);
    mostrarFeedback("Dados e contatos do site atualizados com sucesso!");
  };

  // =========================================================
  // TELA 0: PORTAL DO ADMINISTRADOR (FUNDO VINHO DA REFERÊNCIA)
  // =========================================================
  if (abaAtual === "portal") {
    return (
      <main className="admin-portal-screen">
        <div className="admin-portal-inner">
          <h1>Boas-vindas ao portal do Administrador</h1>

          <div className="admin-portal-cards">
            <button
              type="button"
              className="portal-choice-card"
              onClick={() => setAbaAtual("catalogo")}
            >
              <span>Acervo e catálogo</span>
              <small>{produtos.length} produtos cadastrados</small>
            </button>

            <button
              type="button"
              className="portal-choice-card"
              onClick={() => setAbaAtual("encomendas")}
            >
              <span>Encomendas</span>
              <small>{encomendas.length} solicitações registradas</small>
            </button>

            <button
              type="button"
              className="portal-choice-card"
              onClick={() => {
                setFormSite(configSite);
                setAbaAtual("editar");
              }}
            >
              <span>Editar dados do site</span>
              <small>Contatos, textos e imagens</small>
            </button>
          </div>
        </div>
      </main>
    );
  }

  const produtosFiltrados = produtos.filter(
    (p) =>
      p.nome.toLowerCase().includes(buscaProd.toLowerCase()) ||
      p.tipo.toLowerCase().includes(buscaProd.toLowerCase())
  );

  // =========================================================
  // SUBTELAS DO ADMINISTRADOR
  // =========================================================
  return (
    <main className="admin-page">
      {/* Barra superior de navegação interna do Admin */}
      <div className="admin-subnav">
        <button
          type="button"
          className="admin-portal-return"
          onClick={() => setAbaAtual("portal")}
        >
          ← Voltar ao Portal do Administrador
        </button>

        <div className="admin-subnav-pills">
          <button
            type="button"
            className={abaAtual === "catalogo" ? "is-active" : ""}
            onClick={() => setAbaAtual("catalogo")}
          >
            Acervo e catálogo
          </button>
          <button
            type="button"
            className={abaAtual === "encomendas" ? "is-active" : ""}
            onClick={() => setAbaAtual("encomendas")}
          >
            Encomendas ({encomendas.length})
          </button>
          <button
            type="button"
            className={abaAtual === "editar" ? "is-active" : ""}
            onClick={() => {
              setFormSite(configSite);
              setAbaAtual("editar");
            }}
          >
            Editar dados do site
          </button>
        </div>
      </div>

      {feedback && (
        <div className="admin-toast" role="status">
          ✦ {feedback}
        </div>
      )}

      {/* =========================================
          SUBTELA 1: ACERVO, CATÁLOGO & CATEGORIAS
          ========================================= */}
      {abaAtual === "catalogo" && (
        <>
          <header className="admin-header">
            <div>
              <span className="admin-eyebrow">GESTÃO DE PRODUTOS</span>
              <h1>Acervo &amp; Estoque</h1>
              <p>
                Cadastre novos itens, crie categorias personalizadas e controle a
                disponibilidade em tempo real.
              </p>
            </div>
          </header>

          <div className="admin-grid">
            {/* Formulário */}
            <section className="admin-form-card">
              <div className="admin-card-top">
                <h2>{editandoId ? "Editar produto" : "Novo produto"}</h2>
                {editandoId && (
                  <button
                    type="button"
                    className="admin-cancel-link"
                    onClick={cancelarEdicaoProduto}
                  >
                    Cancelar edição
                  </button>
                )}
              </div>

              <form className="admin-form" onSubmit={handleSubmitProduto}>
                <label className="adm-field">
                  <span>Nome do produto</span>
                  <input
                    type="text"
                    required
                    placeholder="Ex: Vela Botânica Lavanda"
                    value={formProd.nome}
                    onChange={(e) =>
                      setFormProd({ ...formProd, nome: e.target.value })
                    }
                  />
                </label>

                {/* Categoria + Botão Criar Nova Categoria */}
                <div className="adm-field">
                  <div className="adm-label-row">
                    <span>Categoria</span>
                    <button
                      type="button"
                      className="adm-inline-link"
                      onClick={() => setCriandoCategoria((v) => !v)}
                    >
                      {criandoCategoria ? "Cancelar" : "+ Nova categoria"}
                    </button>
                  </div>

                  {!criandoCategoria ? (
                    <select
                      value={formProd.tipo}
                      onChange={(e) =>
                        setFormProd({ ...formProd, tipo: e.target.value })
                      }
                    >
                      {categorias.map((cat) => (
                        <option key={cat} value={cat}>
                          {cat}
                        </option>
                      ))}
                    </select>
                  ) : (
                    <div className="adm-new-cat-row">
                      <input
                        type="text"
                        placeholder="Nome da nova categoria..."
                        value={novaCategoriaNome}
                        onChange={(e) => setNovaCategoriaNome(e.target.value)}
                      />
                      <button
                        type="button"
                        className="adm-small-save-btn"
                        onClick={handleCriarCategoria}
                      >
                        Criar
                      </button>
                    </div>
                  )}
                </div>

                <div className="adm-row-2">
                  <label className="adm-field">
                    <span>Preço (R$)</span>
                    <input
                      type="text"
                      required
                      placeholder="0,00"
                      value={formProd.preco}
                      onChange={(e) => {
                        // 1. Remove tudo que não for número (letras, vírgulas, pontos)
                        let apenasNumeros = e.target.value.replace(/\D/g, "");
                        
                        // 2. Se apagar tudo, limpa o campo
                        if (apenasNumeros === "") {
                          setFormProd({ ...formProd, preco: "" });
                          return;
                        }
                        
                        // 3. Converte para centavos e formata com a vírgula (Ex: 3499 vira "34,99")
                        const valorFormatado = (parseInt(apenasNumeros, 10) / 100)
                          .toFixed(2)
                          .replace(".", ",");
                          
                        setFormProd({ ...formProd, preco: valorFormatado });
                      }}
                    />
                  </label>

                  <label className="adm-field">
                    <span>Tamanho / Peso</span>
                    <input
                      type="text"
                      placeholder="Ex: 110g ou 150ml"
                      value={formProd.tamanho}
                      onChange={(e) =>
                        setFormProd({ ...formProd, tamanho: e.target.value })
                      }
                    />
                  </label>
                </div>

                <label className="adm-field">
                  <span>Disponibilidade</span>
                  <select
                    value={formProd.disponibilidade}
                    onChange={(e) =>
                      setFormProd({
                        ...formProd,
                        disponibilidade: e.target.value,
                      })
                    }
                  >
                    <option value="Em estoque">Em estoque</option>
                    <option value="Sob encomenda">Sob encomenda</option>
                  </select>
                </label>

                <label className="adm-field">
                  <span>Ingredientes / Notas</span>
                  <input
                    type="text"
                    placeholder="Ex: Mel, Camomila, Karité"
                    value={formProd.ingredientesTexto}
                    onChange={(e) =>
                      setFormProd({
                        ...formProd,
                        ingredientesTexto: e.target.value,
                      })
                    }
                  />
                </label>

                <div className="adm-field">
                  <span>Fotografia do produto</span>
                  <div className="adm-image-box">
                    <img
                      src={formProd.imagem}
                      alt="Pré-visualização"
                      className="adm-img-preview"
                    />
                    <div className="adm-image-controls">
                      <select
                        value={
                          IMAGENS_PADRAO.some((i) => i.path === formProd.imagem)
                            ? formProd.imagem
                            : ""
                        }
                        onChange={(e) => {
                          if (e.target.value) {
                            setFormProd({ ...formProd, imagem: e.target.value });
                          }
                        }}
                      >
                        <option value="">Escolher do acervo...</option>
                        {IMAGENS_PADRAO.map((img) => (
                          <option key={img.path} value={img.path}>
                            {img.label}
                          </option>
                        ))}
                      </select>

                      <label className="adm-upload-btn">
                        Carregar imagem do computador
                        <input
                          type="file"
                          accept="image/*"
                          onChange={handleUploadImagemProduto}
                          hidden
                        />
                      </label>
                    </div>
                  </div>
                </div>

                <label className="adm-field">
                  <span>Descrição</span>
                  <textarea
                    rows="2"
                    value={formProd.descricao}
                    onChange={(e) =>
                      setFormProd({ ...formProd, descricao: e.target.value })
                    }
                  />
                </label>

                <label className="adm-checkbox">
                  <input
                    type="checkbox"
                    checked={formProd.personalizavel}
                    onChange={(e) =>
                      setFormProd({
                        ...formProd,
                        personalizavel: e.target.checked,
                      })
                    }
                  />
                  <span>Permitir personalização no modal</span>
                </label>

                <button type="submit" className="adm-submit-btn">
                  {editandoId ? "Salvar alterações ✓" : "+ Cadastrar produto"}
                </button>
              </form>
            </section>

            {/* Tabela */}
            <section className="admin-list-card">
              <div className="admin-list-header">
                <h2>Itens cadastrados ({produtosFiltrados.length})</h2>
                <input
                  type="search"
                  className="admin-search"
                  placeholder="Filtrar por nome ou categoria..."
                  value={buscaProd}
                  onChange={(e) => setBuscaProd(e.target.value)}
                />
              </div>

              <div className="admin-table-wrapper">
                <table className="admin-table">
                  <thead>
                    <tr>
                      <th>Produto</th>
                      <th>Categoria</th>
                      <th>Preço</th>
                      <th>Status</th>
                      <th>Ações</th>
                    </tr>
                  </thead>
                  <tbody>
                    {produtosFiltrados.map((produto) => (
                      <tr
                        key={produto.id}
                        className={editandoId === produto.id ? "is-editing" : ""}
                      >
                        <td>
                          <div className="adm-prod-cell">
                            <img src={produto.imagem} alt={produto.nome} />
                            <div>
                              <strong>{produto.nome}</strong>
                              <small>{produto.tamanho}</small>
                            </div>
                          </div>
                        </td>
                        <td>{produto.tipo}</td>
                        <td className="adm-price">
                          R$ {produto.preco.toFixed(2).replace(".", ",")}
                        </td>
                        <td>
                          <button
                            type="button"
                            className={`status-toggle-btn ${
                              produto.disponibilidade === "Em estoque"
                                ? "in-stock"
                                : "on-order"
                            }`}
                            onClick={() =>
                              onAtualizarProduto({
                                ...produto,
                                disponibilidade:
                                  produto.disponibilidade === "Em estoque"
                                    ? "Sob encomenda"
                                    : "Em estoque",
                              })
                            }
                          >
                            {produto.disponibilidade}
                          </button>
                        </td>
                        <td>
                          <div className="adm-actions">
                            <button
                              type="button"
                              className="adm-action-btn edit"
                              onClick={() => iniciarEdicaoProduto(produto)}
                            >
                              Editar
                            </button>
                            <button
                              type="button"
                              className="adm-action-btn delete"
                              onClick={() => {
                                if (
                                  window.confirm(
                                    `Excluir "${produto.nome}" do catálogo?`
                                  )
                                ) {
                                  onExcluirProduto(produto.id);
                                }
                              }}
                            >
                              Excluir
                            </button>
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </section>
          </div>
        </>
      )}

      {/* =========================================
          SUBTELA 2: ENCOMENDAS & ORÇAMENTOS
          ========================================= */}
      {abaAtual === "encomendas" && (() => {
        const statusOpcoes = ["Todos", "Novo", "Em produção", "Concluído"];
        const encomendasFiltradas =
          filtroStatusEncomenda === "Todos"
            ? encomendas
            : encomendas.filter((e) => e.status === filtroStatusEncomenda);

        return (
          <>
            <header className="admin-header admin-header-row">
              <div>
                <span className="admin-eyebrow">ATELIER &amp; EVENTOS</span>
                <h1>Solicitações de Encomenda</h1>
                <p>
                  Acompanhe os pedidos personalizados e orçamentos de atacado
                  enviados pelo site.
                </p>
              </div>

              {/* Barra de Filtros por Status */}
              <div className="admin-status-filters" role="group" aria-label="Filtrar encomendas por status">
                {statusOpcoes.map((st) => {
                  const qtd =
                    st === "Todos"
                      ? encomendas.length
                      : encomendas.filter((e) => e.status === st).length;

                  return (
                    <button
                      key={st}
                      type="button"
                      className={`status-filter-pill ${
                        filtroStatusEncomenda === st ? "is-active" : ""
                      }`}
                      onClick={() => setFiltroStatusEncomenda(st)}
                    >
                      {st} ({qtd})
                    </button>
                  );
                })}
              </div>
            </header>

            {encomendasFiltradas.length === 0 ? (
              <div className="admin-empty-box">
                Nenhuma solicitação encontrada com o status{" "}
                <strong>{filtroStatusEncomenda}</strong>.
              </div>
            ) : (
              <div className="admin-encomendas-grid">
                {encomendasFiltradas.map((enc) => (
                  <article key={enc.id} className="admin-enc-card">
                    <div className="admin-enc-top">
                      <span className="admin-enc-tag">{enc.ocasiao}</span>
                      <select
                        className={`enc-status-select status-${enc.status
                          .toLowerCase()
                          .replace(/\s+/g, "-")}`}
                        value={enc.status}
                        onChange={(e) =>
                          onAtualizarStatusEncomenda(enc.id, e.target.value)
                        }
                      >
                        <option value="Novo">Novo</option>
                        <option value="Em produção">Em produção</option>
                        <option value="Concluído">Concluído</option>
                      </select>
                    </div>

                    <h3>{enc.cliente}</h3>
                    <p className="admin-enc-meta">
                      <strong>Produto:</strong> {enc.produto} •{" "}
                      <strong>Qtd:</strong> {enc.quantidade}
                    </p>
                    {enc.aromas && (
                      <p className="admin-enc-meta">
                        <strong>Aromas:</strong> {enc.aromas}
                      </p>
                    )}
                    {enc.dataEvento && (
                      <p className="admin-enc-meta">
                        <strong>Data prevista:</strong> {enc.dataEvento}
                      </p>
                    )}
                    {enc.observacoes && (
                      <p className="admin-enc-obs">“{enc.observacoes}”</p>
                    )}
                  </article>
                ))}
              </div>
            )}
          </>
        );
      })()}

      {/* =========================================
          SUBTELA 3: EDITAR DADOS E CONTATOS DO SITE
          ========================================= */}
      {abaAtual === "editar" && (
        <>
          <header className="admin-header">
            <div>
              <span className="admin-eyebrow">IDENTIDADE &amp; CANAIS</span>
              <h1>Editar Dados do Site</h1>
              <p>
                Atualize telefones, formas de contato, textos institucionais e
                fotografias principais da vitrine.
              </p>
            </div>
          </header>

          <form className="admin-site-editor" onSubmit={handleSalvarDadosSite}>
            <div className="site-editor-col">
              <h2>Formas de Contato</h2>

              <label className="adm-field">
                <span>WhatsApp de Atendimento (apenas números com DDI)</span>
                <input
                  type="text"
                  value={formSite.whatsapp}
                  onChange={(e) =>
                    setFormSite({ ...formSite, whatsapp: e.target.value })
                  }
                />
              </label>

              <label className="adm-field">
                <span>Instagram (@usuario)</span>
                <input
                  type="text"
                  value={formSite.instagram}
                  onChange={(e) =>
                    setFormSite({ ...formSite, instagram: e.target.value })
                  }
                />
              </label>

              <label className="adm-field">
                <span>E-mail Oficial</span>
                <input
                  type="email"
                  value={formSite.email}
                  onChange={(e) =>
                    setFormSite({ ...formSite, email: e.target.value })
                  }
                />
              </label>

              <label className="adm-field">
                <span>Horário de Atendimento</span>
                <input
                  type="text"
                  value={formSite.horarioAtendimento || ""}
                  onChange={(e) =>
                    setFormSite({
                      ...formSite,
                      horarioAtendimento: e.target.value,
                    })
                  }
                  placeholder="Seg–sex, das 9h às 18h"
                />
              </label>

              <label className="adm-field">
                <span>Cidade / Atelier (Rodapé)</span>
                <input
                  type="text"
                  value={formSite.endereco}
                  onChange={(e) =>
                    setFormSite({ ...formSite, endereco: e.target.value })
                  }
                />
              </label>
            </div>

            <div className="site-editor-col">
              <h2>Textos &amp; Imagens Principais</h2>

              <label className="adm-field">
                <span>Título principal da Vitrine</span>
                <input
                  type="text"
                  value={formSite.heroTitulo || ""}
                  onChange={(e) =>
                    setFormSite({
                      ...formSite,
                      heroTitulo: e.target.value,
                    })
                  }
                />
              </label>

              <label className="adm-field">
                <span>Subtítulo da Vitrine (Hero Banner)</span>
                <input
                  type="text"
                  value={formSite.heroSubtitulo}
                  onChange={(e) =>
                    setFormSite({ ...formSite, heroSubtitulo: e.target.value })
                  }
                />
              </label>

              <label className="adm-field">
                <span>Texto da Página Fale Conosco</span>
                <textarea
                  rows="3"
                  value={formSite.textoContato}
                  onChange={(e) =>
                    setFormSite({ ...formSite, textoContato: e.target.value })
                  }
                />
              </label>
                
              <div className="adm-field">
                <span>Imagem principal da Homepage (Hero)</span>

                <div className="adm-image-box">
                  <img
                    src={formSite.imagemHero}
                    alt="Prévia da imagem principal"
                    className="adm-img-preview"
                  />

                  <div className="adm-image-controls">
                    <label className="adm-upload-btn">
                      Trocar imagem principal

                      <input
                        type="file"
                        accept="image/*"
                        onChange={(e) =>
                          handleUploadImagemSite(e, "imagemHero")
                        }
                        hidden
                      />
                    </label>
                  </div>
                </div>
              </div>


              <div className="adm-field">
                <span>Imagem Destaque (Encomendas / Atelier)</span>
                <div className="adm-image-box">
                  <img
                    src={formSite.imagemAtelier}
                    alt="Atelier"
                    className="adm-img-preview"
                  />
                  <div className="adm-image-controls">
                    <label className="adm-upload-btn">
                      Trocar fotografia do Atelier
                      <input
                        type="file"
                        accept="image/*"
                        onChange={(e) =>
                          handleUploadImagemSite(e, "imagemAtelier")
                        }
                        hidden
                      />
                    </label>
                  </div>
                </div>
              </div>

              <button type="submit" className="adm-submit-btn">
                Salvar alterações do site ✓
              </button>
            </div>
          </form>
        </>
      )}
    </main>
  );
}