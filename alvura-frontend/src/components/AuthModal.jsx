import React, { useState, useEffect } from "react";
<<<<<<< HEAD
//import { USUARIOS_MOCK } from "../data/usuarioMock";
=======
import { USUARIOS_MOCK } from "../data/usuarioMock";
>>>>>>> 5e4afbb72e8619d2e1ed734d43697fcd90873cb8
import "../styles/authModal.css";

export default function AuthModal({ isOpen, onClose, onLoginSuccess }) {
  const [modo, setModo] = useState("login"); // "login" | "registro"
  const [nome, setNome] = useState("");
  const [email, setEmail] = useState("");
  const [senha, setSenha] = useState("");
  const [confirmarSenha, setConfirmarSenha] = useState("");
  const [erro, setErro] = useState("");

  useEffect(() => {
    if (isOpen) {
      setErro("");
    }
  }, [isOpen, modo]);

  useEffect(() => {
    const handleEsc = (e) => {
      if (e.key === "Escape" && isOpen) onClose();
    };
    window.addEventListener("keydown", handleEsc);
    return () => window.removeEventListener("keydown", handleEsc);
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  const alternarModo = (novoModo) => {
    setModo(novoModo);
    setErro("");
    setSenha("");
    setConfirmarSenha("");
  };

<<<<<<< HEAD
const handleSubmit = (e) => {
=======
  const handleSubmit = (e) => {
>>>>>>> 5e4afbb72e8619d2e1ed734d43697fcd90873cb8
    e.preventDefault();
    setErro("");

    if (modo === "login") {
<<<<<<< HEAD
      // --- LÓGICA REAL DE LOGIN ---
      fetch('http://localhost:8080/api/usuarios/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email: email.trim(), senha: senha })
      })
      .then(async (res) => {
        if (res.ok) {
          const usuarioLogado = await res.json();
          onLoginSuccess(usuarioLogado);
          onClose();
        } else {
          // Lê a mensagem de erro enviada pelo Java (ex: "E-mail ou senha inválidos.")
          const msgErro = await res.text();
          setErro(msgErro || "E-mail ou senha incorretos.");
        }
      })
      .catch(() => setErro("Erro de conexão. O servidor backend está rodando?"));
      
      return;
    }

    // --- VALIDAÇÕES DE REGISTRO ---
=======
      const usuarioEncontrado = USUARIOS_MOCK.find(
        (u) =>
          u.email.toLowerCase() === email.trim().toLowerCase() &&
          u.senha === senha
      );

      if (!usuarioEncontrado) {
        setErro("E-mail ou senha incorretos. Confira os dados e tente novamente.");
        return;
      }

      onLoginSuccess(usuarioEncontrado);
      onClose();
      return;
    }

>>>>>>> 5e4afbb72e8619d2e1ed734d43697fcd90873cb8
    if (nome.trim().length < 2) {
      setErro("Por favor, informe seu nome completo.");
      return;
    }

    if (senha.length < 3) {
      setErro("A senha deve ter pelo menos 3 caracteres.");
      return;
    }

    if (senha !== confirmarSenha) {
      setErro("As senhas não coincidem.");
      return;
    }

<<<<<<< HEAD
    // --- LÓGICA REAL DE REGISTRO ---
    const novoUsuario = {
      nome: nome.trim(),
      email: email.trim().toLowerCase(),
      senha: senha,
      role: "cliente", // Todo novo cadastro pelo site é cliente por padrão
    };

    fetch('http://localhost:8080/api/usuarios/registro', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(novoUsuario)
    })
    .then(async (res) => {
      if (res.ok) {
        const usuarioSalvo = await res.json();
        onLoginSuccess(usuarioSalvo); // Loga o usuário automaticamente após criar
        onClose();
      } else {
        const msgErro = await res.text();
        setErro(msgErro || "Erro ao realizar cadastro.");
      }
    })
    .catch(() => setErro("Erro de conexão. O servidor backend está rodando?"));
=======
    const novoUsuario = {
      id: Date.now(),
      nome: nome.trim(),
      email: email.trim().toLowerCase(),
      role: "cliente",
    };

    onLoginSuccess(novoUsuario);
    onClose();
>>>>>>> 5e4afbb72e8619d2e1ed734d43697fcd90873cb8
  };

  return (
    <div
      className="auth-backdrop"
      onClick={onClose}
      role="dialog"
      aria-modal="true"
      aria-labelledby="auth-modal-title"
    >
      <div className="auth-modal-card" onClick={(e) => e.stopPropagation()}>
        <button
          type="button"
          className="auth-close-btn"
          onClick={onClose}
          aria-label="Fechar janela de acesso"
        >
          ✕
        </button>

        {/* Cabeçalho editorial com linguagem neutra */}
        <div className="auth-header">
          <span className="auth-eyebrow">ALVURA NATURAL COSMÉTICOS</span>
          <h2 id="auth-modal-title">
            {modo === "login" ? "Boas-vindas de volta" : "Crie sua conta"}
          </h2>
          <p>
            {modo === "login"
              ? "Acesse sua conta para acompanhar encomendas e salvar seus produtos favoritos."
              : "Cadastre-se para personalizar encomendas, salvar endereços e agilizar seus pedidos."}
          </p>
        </div>

        {/* Formulário */}
        <form className="auth-form" onSubmit={handleSubmit}>
          {modo === "registro" && (
            <label className="auth-field">
              <span>Nome completo</span>
              <input
                type="text"
                required
                placeholder="Digite seu nome"
                value={nome}
                onChange={(e) => setNome(e.target.value)}
              />
            </label>
          )}

          <label className="auth-field">
            <span>E-mail</span>
            <input
              type="email"
              required
              placeholder="seuemail@exemplo.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </label>

          <label className="auth-field">
            <span>Senha</span>
            <input
              type="password"
              required
              placeholder="••••••••"
              value={senha}
              onChange={(e) => setSenha(e.target.value)}
            />
          </label>

          {modo === "registro" && (
            <label className="auth-field">
              <span>Confirmar senha</span>
              <input
                type="password"
                required
                placeholder="••••••••"
                value={confirmarSenha}
                onChange={(e) => setConfirmarSenha(e.target.value)}
              />
            </label>
          )}

          {erro && <p className="auth-error-msg">{erro}</p>}

          <button type="submit" className="auth-submit-btn">
            {modo === "login" ? "Entrar na conta →" : "Finalizar cadastro →"}
          </button>
        </form>

        {/* Alternância entre Login e Registro */}
        <div className="auth-switch-footer">
          {modo === "login" ? (
            <p>
              Não tem login?{" "}
              <button
                type="button"
                className="auth-switch-link"
                onClick={() => alternarModo("registro")}
              >
                Registre-se
              </button>
            </p>
          ) : (
            <p>
              Já possui uma conta?{" "}
              <button
                type="button"
                className="auth-switch-link"
                onClick={() => alternarModo("login")}
              >
                Fazer login
              </button>
            </p>
          )}
        </div>
      </div>
    </div>
  );
}