function Home() {
  return (
    <main style={styles.container}>
      <header style={styles.header}>
        <h1 style={styles.title}>Plataforma de Estudos em Engenharia</h1>
        <p style={styles.subtitle}>
          Aulas, exercícios resolvidos, provas comentadas e mentorias para você
          passar nas disciplinas mais difíceis.
        </p>
      </header>

      <section style={styles.actions}>
        <a href="/login" style={styles.buttonPrimary}>
          Entrar
        </a>
        <a href="/register" style={styles.buttonSecondary}>
          Criar conta
        </a>
      </section>

      <section style={styles.features}>
        <div style={styles.card}>📘 Aulas explicadas passo a passo</div>
        <div style={styles.card}>📝 Exercícios resolvidos</div>
        <div style={styles.card}>🎯 Provas comentadas</div>
        <div style={styles.card}>🤝 Mentoria para tirar dúvidas</div>
      </section>
    </main>
  );
}

const styles = {
  container: {
    minHeight: "100vh",
    padding: "40px",
    fontFamily: "Arial, sans-serif",
    backgroundColor: "#f8f9fa",
    textAlign: "center",
  },
  header: {
    maxWidth: "700px",
    margin: "0 auto 40px",
  },
  title: {
    fontSize: "2.5rem",
    marginBottom: "16px",
  },
  subtitle: {
    fontSize: "1.2rem",
    color: "#555",
  },
  actions: {
    marginBottom: "50px",
  },
  buttonPrimary: {
    marginRight: "12px",
    padding: "12px 24px",
    backgroundColor: "#0d6efd",
    color: "#fff",
    textDecoration: "none",
    borderRadius: "6px",
    fontWeight: "bold",
  },
  buttonSecondary: {
    padding: "12px 24px",
    border: "2px solid #0d6efd",
    color: "#0d6efd",
    textDecoration: "none",
    borderRadius: "6px",
    fontWeight: "bold",
  },
  features: {
    display: "grid",
    gridTemplateColumns: "repeat(auto-fit, minmax(220px, 1fr))",
    gap: "20px",
    maxWidth: "900px",
    margin: "0 auto",
  },
  card: {
    padding: "20px",
    backgroundColor: "#fff",
    borderRadius: "8px",
    boxShadow: "0 4px 10px rgba(0,0,0,0.08)",
    fontWeight: "500",
  },
};

export default Home;
