import React from "react";
import { useNavigate } from "react-router-dom";

function Home() {
  const navigate = useNavigate();

  return React.createElement(
    "main",
    { style: styles.container },

    React.createElement(
      "header",
      { style: styles.header },

      React.createElement(
        "h1",
        { style: styles.title },
        "Plataforma de Estudos em Engenharia",
      ),

      React.createElement(
        "p",
        { style: styles.subtitle },
        "Aprenda de forma prática, moderna e focada em aprovação.",
      ),

      React.createElement(
        "div",
        { style: styles.actions },

        React.createElement(
          "button",
          {
            style: styles.buttonPrimary,
            onClick: () => navigate("/login"),
          },
          "Entrar",
        ),

        React.createElement(
          "button",
          {
            style: styles.buttonSecondary,
            onClick: () => navigate("/register"),
          },
          "Criar Conta",
        ),
      ),
    ),

    React.createElement(
      "section",
      { style: styles.features },

      FeatureCard({
        icon: "📘",
        title: "Aulas Didáticas",
        text: "Conteúdo do básico ao avançado",
        onClick: () => navigate("/aulas"),
      }),

      FeatureCard({
        icon: "📝",
        title: "Exercícios Resolvidos",
        text: "Passo a passo detalhado",
        onClick: () => navigate("/exercicios"),
      }),

      FeatureCard({
        icon: "🎯",
        title: "Provas Comentadas",
        text: "Simulados reais e correções",
        onClick: () => navigate("/provas"),
      }),

      FeatureCard({
        icon: "🤝",
        title: "Mentoria",
        text: "Acompanhamento individual",
        onClick: () => navigate("/mentoria"),
      }),
    ),
  );
}

function FeatureCard({ icon, title, text, onClick }) {
  return React.createElement(
    "div",
    {
      style: styles.card,
      onClick,
      onMouseEnter: (e) => {
        e.currentTarget.style.transform = "translateY(-8px)";
        e.currentTarget.style.background = "rgba(255,255,255,0.25)";
      },
      onMouseLeave: (e) => {
        e.currentTarget.style.transform = "translateY(0)";
        e.currentTarget.style.background = "rgba(255,255,255,0.15)";
      },
    },

    React.createElement("span", { style: styles.cardIcon }, icon),

    React.createElement("h3", { style: styles.cardTitle }, title),

    React.createElement("p", { style: styles.cardText }, text),
  );
}

const styles = {
  container: {
    minHeight: "100vh",
    padding: "60px 20px",
    fontFamily: "Arial, sans-serif",
    background: "linear-gradient(135deg, #0d6efd, #6610f2)",
    color: "#fff",
  },

  header: {
    maxWidth: "800px",
    margin: "0 auto 60px",
    textAlign: "center",
  },

  title: {
    fontSize: "3rem",
    marginBottom: "20px",
  },

  subtitle: {
    fontSize: "1.3rem",
    opacity: 0.9,
    marginBottom: "40px",
  },

  actions: {
    display: "flex",
    justifyContent: "center",
    gap: "16px",
    flexWrap: "wrap",
  },

  buttonPrimary: {
    padding: "14px 32px",
    backgroundColor: "#fff",
    color: "#0d6efd",
    border: "none",
    borderRadius: "30px",
    fontSize: "1rem",
    fontWeight: "bold",
    cursor: "pointer",
    transition: "all 0.3s ease",
  },

  buttonSecondary: {
    padding: "14px 32px",
    backgroundColor: "transparent",
    border: "2px solid #fff",
    color: "#fff",
    borderRadius: "30px",
    fontSize: "1rem",
    fontWeight: "bold",
    cursor: "pointer",
    transition: "all 0.3s ease",
  },

  features: {
    maxWidth: "1000px",
    margin: "0 auto",
    display: "grid",
    gridTemplateColumns: "repeat(auto-fit, minmax(220px, 1fr))",
    gap: "24px",
  },

  card: {
    background: "rgba(255,255,255,0.15)",
    backdropFilter: "blur(10px)",
    borderRadius: "16px",
    padding: "30px",
    textAlign: "center",
    cursor: "pointer",
    transition: "all 0.3s ease",
  },

  cardIcon: {
    fontSize: "2.5rem",
    display: "block",
    marginBottom: "16px",
  },

  cardTitle: {
    fontSize: "1.3rem",
    marginBottom: "10px",
  },

  cardText: {
    fontSize: "0.95rem",
    opacity: 0.9,
  },
};

export default Home;
