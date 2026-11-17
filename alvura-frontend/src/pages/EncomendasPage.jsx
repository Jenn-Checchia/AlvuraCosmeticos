import React, { useState } from "react";
import "../styles/encomendas.css";

const AROMAS_DISPONIVEIS = [
  "Cereja e Avelã",
  "Mel e Camomila",
  "Patchouli Floral",
  "Frutas Cítricas",
  "Lavanda & Alecrim",
  "A definir / Sortidos",
];

export default function EncomendasPage({ onSolicitarOrcamento, onVoltarAcervo }) {
  const [nome, setNome] = useState("");
  const [ocasiao, setOcasiao] = useState("Casamento / Noivado");
  const [produtoInteresse, setProdutoInteresse] = useState("Mini Velas Aromáticas");
  const [quantidade, setQuantidade] = useState("30 a 49 unidades");
  const [dataEvento, setDataEvento] = useState("");
  const [aromasSelecionados, setAromasSelecionados] = useState(["Cereja e Avelã"]);
  const [personalizacao, setPersonalizacao] = useState("");

  const toggleAroma = (aroma) => {
    setAromasSelecionados((prev) =>
      prev.includes(aroma)
        ? prev.filter((item) => item !== aroma)
        : [...prev, aroma]
    );
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    // 1. Constrói o objeto JSON para o Banco de Dados
    const dadosParaBanco = {
      cliente: nome || "Não informado",
      ocasiao: ocasiao,
      produto: produtoInteresse,
      quantidade: quantidade,
      aromas: aromasSelecionados.join(", "),
      dataEvento: dataEvento,
      observacoes: personalizacao.trim(),
      status: "Novo"
    };

    // 2. Constrói a mensagem de texto para o WhatsApp
    const mensagemWhatsApp = [
      `Olá, Alvura! Gostaria de solicitar um orçamento para *Encomenda / Atacado*:`,
      `• *Nome:* ${dadosParaBanco.cliente}`,
      `• *Ocasião:* ${dadosParaBanco.ocasiao}`,
      `• *Produto:* ${dadosParaBanco.produto}`,
      `• *Quantidade estimada:* ${dadosParaBanco.quantidade}`,
      aromasSelecionados.length > 0 ? `• *Aromas escolhidos:* ${dadosParaBanco.aromas}` : null,
      dadosParaBanco.dataEvento ? `• *Data prevista:* ${dadosParaBanco.dataEvento}` : null,
      dadosParaBanco.observacoes ? `• *Detalhes / Personalização:* ${dadosParaBanco.observacoes}` : null,
    ].filter(Boolean).join("\n");

    // 3. Envia os DOIS dados para o App.jsx
    if (onSolicitarOrcamento) {
      onSolicitarOrcamento(dadosParaBanco, mensagemWhatsApp);
    }
  };

  return (
    <main className="encomendas-page">
      {/* Barra superior com Voltar à esquerda (IHC) */}
      <div className="encomendas-top-nav">
        {onVoltarAcervo && (
          <button
            type="button"
            className="encomendas-back-link"
            onClick={onVoltarAcervo}
          >
            ← Voltar para o Acervo
          </button>
        )}
      </div>

      {/* Grade principal assimétrica: Painel Marrom à Esquerda + Conteúdo à Direita */}
      <div className="encomendas-split-layout">
        {/* COLUNA ESQUERDA: Painel Marrom com Moldura em Fio de Ouro */}
        <aside className="encomendas-left-panel" aria-label="Sugestões de eventos">
          <div className="gold-frame-outer" aria-hidden="true">
            <div className="gold-frame-inner" />
          </div>

          {/* Foto em destaque (reduzida para dar protagonismo aos cards) */}
          <div className="panel-hero-photo">
            <img
              src="/images/encomendas.png"
              alt="Vela aromática e sabonetes florais artesanais Alvura"
            />
          </div>

          {/* 3 Cards de Sugestões de Eventos ampliados */}
          <div className="panel-ocasions-grid">
            <article className="ocasion-gold-card">
              <div className="ocasion-inner-frame">
                <span className="ocasion-num">01</span>
                <h3>Casamentos &amp; Celebrações</h3>
                <p>
                  Lembrancinhas botânicas com tags personalizadas com as iniciais do
                  casal, datas e acabamento artesanal em linho ou fita de cetim.
                </p>
              </div>
            </article>

            <article className="ocasion-gold-card">
              <div className="ocasion-inner-frame">
                <span className="ocasion-num">02</span>
                <h3>Corporativo &amp; Marcas</h3>
                <p>
                  Presentes sensoriais para clientes, equipes e lançamentos, com
                  possibilidade de aplicação da sua identidade visual nos rótulos.
                </p>
              </div>
            </article>

            <article className="ocasion-gold-card">
              <div className="ocasion-inner-frame">
                <span className="ocasion-num">03</span>
                <h3>Eventos &amp; Maternidade</h3>
                <p>
                  Mini velas, sabonetes florais e escalda-pés em lotes a partir de{" "}
                  <strong>15 unidades</strong> com condições progressivas de atacado.
                </p>
              </div>
            </article>
          </div>
        </aside>

        {/* COLUNA DIREITA: Título Editorial + Como Funciona & Formulário */}
        <section className="encomendas-right-content">
          <header className="encomendas-editorial-header">
            <span className="encomendas-eyebrow">ATELIER &amp; ATACADO</span>
            <h1>
              <span className="title-line-1">Encomendas especiais para</span>
              <span className="title-line-2">momentos memoráveis</span>
            </h1>
            <p>
              Produzimos lotes artesanais sob medida com rótulos personalizados,
              fitas na paleta da sua celebração e aromas escolhidos por você.
            </p>
          </header>

          {/* Quadro inferior: Regras à esquerda + Simular orçamento à direita */}
          <div className="encomendas-form-box">
            <div className="encomendas-info-col">
              <h2>Como funciona o pedido sob medida</h2>

              <ul className="encomendas-steps">
                <li>
                  <strong>Pedido mínimo:</strong> A partir de 15 unidades do mesmo
                  item ou kit.
                </li>
                <li>
                  <strong>Prazo de produção:</strong> Recomendamos solicitar com
                  15 a 30 dias de antecedência para cura e acabamento manual.
                </li>
                <li>
                  <strong>Personalização completa:</strong> Escolha entre nossos
                  aromas autorais e defina o texto do rótulo.
                </li>
                <li>
                  <strong>Condições progressivas:</strong> Descontos especiais a
                  partir de 30, 50 e 100 unidades.
                </li>
              </ul>
            </div>

            <form className="encomendas-form-card" onSubmit={handleSubmit}>
              <h3>Simular orçamento</h3>

              <label className="enc-field">
                <span>Seu nome ou empresa</span>
                <input
                  type="text"
                  required
                  placeholder="Ex: Marina Silva / Studio..."
                  value={nome}
                  onChange={(e) => setNome(e.target.value)}
                />
              </label>

              <div className="enc-row-2">
                <label className="enc-field">
                  <span>Ocasião</span>
                  <select
                    value={ocasiao}
                    onChange={(e) => setOcasiao(e.target.value)}
                  >
                    <option value="Casamento / Noivado">Casamento / Noivado</option>
                    <option value="Brinde Corporativo">Brinde Corporativo</option>
                    <option value="Aniversário / Maternidade">
                      Aniversário / Maternidade
                    </option>
                    <option value="Revenda / Atacado">Revenda / Atacado</option>
                    <option value="Outro evento">Outro evento</option>
                  </select>
                </label>

                <label className="enc-field">
                  <span>Quantidade estimada</span>
                  <select
                    value={quantidade}
                    onChange={(e) => setQuantidade(e.target.value)}
                  >
                    <option value="15 a 29 unidades">15 a 29 unidades</option>
                    <option value="30 a 49 unidades">30 a 49 unidades</option>
                    <option value="50 a 99 unidades">50 a 99 unidades</option>
                    <option value="100 ou mais unidades">
                      100 ou mais unidades
                    </option>
                  </select>
                </label>
              </div>

              <div className="enc-row-2">
                <label className="enc-field">
                  <span>Produto desejado</span>
                  <select
                    value={produtoInteresse}
                    onChange={(e) => setProdutoInteresse(e.target.value)}
                  >
                    <option value="Mini Velas Aromáticas">
                      Mini Velas Aromáticas
                    </option>
                    <option value="Sabonetes Artesanais">
                      Sabonetes Artesanais
                    </option>
                    <option value="Escalda-pés em Vidro">
                      Escalda-pés em Vidro
                    </option>
                    <option value="Mini Hidratantes Corporais">
                      Mini Hidratantes Corporais
                    </option>
                    <option value="Kits Presenteáveis Completos">
                      Kits Presenteáveis Completos
                    </option>
                  </select>
                </label>

                <label className="enc-field">
                  <span>Data prevista do evento</span>
                  <input
                    type="date"
                    value={dataEvento}
                    onChange={(e) => setDataEvento(e.target.value)}
                  />
                </label>
              </div>

              {/* Seleção de Aromas em Checkboxes */}
              <div className="enc-field">
                <span>Aromas de preferência (selecione um ou mais)</span>
                <div className="enc-aromas-grid">
                  {AROMAS_DISPONIVEIS.map((aroma) => (
                    <label key={aroma} className="enc-checkbox-item">
                      <input
                        type="checkbox"
                        checked={aromasSelecionados.includes(aroma)}
                        onChange={() => toggleAroma(aroma)}
                      />
                      <span>{aroma}</span>
                    </label>
                  ))}
                </div>
              </div>

              <label className="enc-field">
                <span>Cores, embalagem ou texto do rótulo</span>
                <textarea
                  rows="3"
                  placeholder="Conte-nos sobre a paleta do evento, laço ou texto personalizado..."
                  value={personalizacao}
                  onChange={(e) => setPersonalizacao(e.target.value)}
                />
              </label>

              <button type="submit" className="enc-submit-btn">
                Solicitar orçamento personalizado →
              </button>
            </form>
          </div>
        </section>
      </div>
    </main>
  );
}