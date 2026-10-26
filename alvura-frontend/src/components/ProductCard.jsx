export default function ProductCard({ produto, onPedir }) {
  return (
    <article className="selecao-card">
      <div className="selecao-thumb">
        {produto.tag && <span className="tag-pill-left">{produto.tag}</span>}
        <img src={produto.imagem} alt={produto.nome} />
        <button 
          className="bag-btn-bottom-right" 
          onClick={() => onPedir(produto.nome)}
          title="Pedir no WhatsApp"
        >
          🛍️
        </button>
      </div>
      <div className="selecao-info">
        <h3>{produto.nome}</h3>
        <span>R$ {produto.preco.toFixed(2).replace('.', ',')}</span>
      </div>
    </article>
  );
}