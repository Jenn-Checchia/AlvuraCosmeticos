import React, { useState, useEffect } from 'react';
import '../styles/faq.css';


const faqs = [
  {
    numero: '1.',
    pergunta: 'Os produtos da Alvura são 100% naturais e veganos?',
    resposta:
      'Sim. Todas as nossas fórmulas são desenvolvidas com matérias-primas vegetais selecionadas, biodegradáveis, livres de parabenos, petrolatos e sem nenhum teste em animais.',
  },
  {
    numero: '2.',
    pergunta: 'Qual é o prazo de entrega e como funciona o frete grátis?',
    resposta:
      'Pedidos acima de R$ 150 contam com frete grátis para todo o Brasil. O prazo de postagem é de até 2 dias úteis após a confirmação, respeitando o cuidado artesanal de cada embalagem.',
  },
  {
    numero: '3.',
    pergunta: 'Posso reutilizar os potes de vidro das velas e hidratantes?',
    resposta:
      'Com certeza! Nossas embalagens foram pensadas para permanecer. Após higienizar o vidro com água morna, você pode usá-lo como porta-objetos, vasinho ou solicitar nossos refis.',
  },
  {
    numero: '4.',
    pergunta: 'Os sabonetes artesanais são indicados para peles sensíveis?',
    resposta:
      'Sim. Como respeitamos o tempo natural de cura e utilizamos óleos e manteigas vegetais puros (como mel, avelã e cereja), eles limpam gentilmente sem ressecar a barreira cutânea.',
  },
];

export default function FaqPage({ perguntaInicial = null }) {

  useEffect(() => {
  setActiveIndex(perguntaInicial);
}, [perguntaInicial]);


  // Permite abrir também com toque no celular, além do hover no computador
  const [activeIndex, setActiveIndex] = useState(perguntaInicial);

  const toggleFaq = (index) => {
    setActiveIndex(activeIndex === index ? null : index);
  };

  return (
    <main className="faq-page-section">
      {/* Imagens decorativas inclinadas nas laterais */}
      <img
        src="/images/sabonete_desenho.png"
        alt=""
        aria-hidden="true"
        className="faq-decor decor-top-left"
      />
      <img
        src="/images/pes_desenho.png"
        alt=""
        aria-hidden="true"
        className="faq-decor decor-bottom-left"
      />
      <img
        src="/images/vela_desenho.png"
        alt=""
        aria-hidden="true"
        className="faq-decor decor-bottom-right"
      />

      <div className="faq-container">
        <header className="faq-header">
          <h1>FAQ</h1>
          <p>Perguntas mais frequentes</p>
        </header>

        <div className="faq-list">
          {faqs.map((item, index) => {
            const isOpen = activeIndex === index;
            return (
              <div
                key={index}
                className={`faq-balloon ${isOpen ? 'is-open' : ''}`}
                onClick={() => toggleFaq(index)}
              >
                <div className="faq-question-row">
                  <span>
                    {item.numero} {item.pergunta}
                  </span>
                  <svg
                    className="faq-chevron"
                    width="22"
                    height="22"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  >
                    <polyline points="6 9 12 15 18 9" />
                  </svg>
                </div>

                <div className="faq-answer-wrapper">
                  <div className="faq-answer-inner">
                    <p>{item.resposta}</p>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </main>
  );
}