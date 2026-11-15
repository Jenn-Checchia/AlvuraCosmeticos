import React from 'react';
import '../styles/contato.css';

export default function ContatoPage({ onWhatsAppClick }) {
  return (
    <main className="contato-full-band">
      <div className="contato-inner">
        {/* Coluna Esquerda: Título, subtítulo e balões de fala */}
        <div className="contato-left">
          <div className="contato-title-row">
            <h1>Fale conosco</h1>
            {/* Rostinho sorridente desenhado à mão igual ao rascunho */}
            <svg
              className="contato-smiley"
              width="68"
              height="52"
              viewBox="0 0 80 60"
              fill="none"
              stroke="currentColor"
              strokeWidth="2.4"
              strokeLinecap="round"
              strokeLinejoin="round"
              aria-hidden="true"
            >
              <path d="M24 10 C24 16, 24 22, 24 26" />
              <path d="M44 10 C44 16, 44 22, 44 26" />
              <path d="M10 35 C22 49, 52 52, 66 47 C72 45, 70 40, 62 39" />
            </svg>
          </div>

          <p className="contato-subtitle">  Fale com humanos!</p>

          <div className="contato-channels">
            {/* Canal 1: WhatsApp */}
            <a
              href="https://wa.me/5567999999999"
              target="_blank"
              rel="noreferrer"
              className="contato-channel-item"
              onClick={(e) => {
                if (onWhatsAppClick) {
                  e.preventDefault();
                  onWhatsAppClick("Olá! Vim pela página Fale Conosco da Alvura.");
                }
              }}
            >
              <div className="speech-bubble-icon">
                <svg
                  className="bubble-outline"
                  viewBox="0 0 110 74"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                >
                  <path d="M55 4 C83 4, 105 18, 105 35 C105 52, 83 66, 55 66 C47 66, 39 65, 32 62 L18 70 L22 57 C11 51, 5 44, 5 35 C5 18, 27 4, 55 4 Z" />
                </svg>
                <svg
                  className="channel-logo"
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="1.7"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <path d="M3 21l1.65-3.8a9 9 0 1 1 3.4 2.9L3 21" />
                  <path d="M9 10a.5.5 0 0 0 1 0V9a.5.5 0 0 0-1 0v1a5 5 0 0 0 5 5h1a.5.5 0 0 0 0-1h-1a.5.5 0 0 0 0 1" />
                </svg>
              </div>
              <div className="channel-text">
                <strong>WhatsApp</strong>
                <span>+55 67 99999-9999</span>
              </div>
            </a>

            {/* Canal 2: Instagram */}
            <a
              href="https://instagram.com/alvura.cosmeticos"
              target="_blank"
              rel="noreferrer"
              className="contato-channel-item"
            >
              <div className="speech-bubble-icon">
                <svg
                  className="bubble-outline"
                  viewBox="0 0 110 74"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                >
                  <path d="M55 4 C83 4, 105 18, 105 35 C105 52, 83 66, 55 66 C47 66, 39 65, 32 62 L18 70 L22 57 C11 51, 5 44, 5 35 C5 18, 27 4, 55 4 Z" />
                </svg>
                <svg
                  className="channel-logo"
                  width="22"
                  height="22"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="1.7"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <rect x="2" y="2" width="20" height="20" rx="5" ry="5" />
                  <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" />
                  <line x1="17.5" y1="6.5" x2="17.51" y2="6.5" />
                </svg>
              </div>
              <div className="channel-text">
                <strong>Instagram</strong>
                <span>@alvura.cosmeticos</span>
              </div>
            </a>

            {/* Canal 3: E-mail */}
            <a
              href="mailto:oi@alvura.com.br"
              className="contato-channel-item"
            >
              <div className="speech-bubble-icon">
                <svg
                  className="bubble-outline"
                  viewBox="0 0 110 74"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                >
                  <path d="M55 4 C83 4, 105 18, 105 35 C105 52, 83 66, 55 66 C47 66, 39 65, 32 62 L18 70 L22 57 C11 51, 5 44, 5 35 C5 18, 27 4, 55 4 Z" />
                </svg>
                <svg
                  className="channel-logo"
                  width="22"
                  height="22"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="1.7"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <rect width="20" height="16" x="2" y="4" rx="2" />
                  <path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7" />
                </svg>
              </div>
              <div className="channel-text">
                <strong>E-mail</strong>
                <span>oi@alvura.com.br</span>
              </div>
            </a>
          </div>
        </div>

        {/* Coluna Direita: Imagem da caixa de produtos */}
        <div className="contato-right">
          <img
            src="/images/caixa_tarde.png"
            alt="Kit artesanal Alvura Cosméticos"
          />
        </div>
      </div>
    </main>
  );
}