export default function CategoryFilter({ onSelectCategory }) {
  const categorias = [
    {
      nome: "Hidratantes",
      imagem: "/assets/products/cereja hidr.png"
    },
    {
      nome: "Sabonetes",
      imagem: "/assets/products/flor ama.png"
    },
    {
      nome: "Velas aromáticas",
      imagem: "/assets/products/vela floral.png"
    }
  ];

  return (
    <section className="section-gesto">
      <div className="section-gesto-header">
        <h2>
          Escolha por gesto, propósito <br />
          <span className="italic">e sensação.</span>
        </h2>
      </div>

      <div className="gesto-cards-grid">
        {categorias.map((cat) => (
          <div 
            key={cat.nome} 
            className="gesto-card" 
            onClick={() => onSelectCategory(cat.nome)}
          >
            <div className="gesto-img-box">
              <button className="arrow-circle-btn">↗</button>
              <img src={cat.imagem} alt={cat.nome} />
            </div>
            <span className="gesto-card-title">{cat.nome}</span>
          </div>
        ))}
      </div>
    </section>
  );
}