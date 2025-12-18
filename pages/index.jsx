import Link from "next/link";

export default function Home() {
  return (
    <main className="container">
      <h1>Plataforma de Engenharia</h1>
      <p>
        Aulas, exercícios resolvidos, provas comentadas e mentorias para você
        dominar as disciplinas mais difíceis.
      </p>

      <div className="buttons">
        <Link href="/login">
          <button>Entrar</button>
        </Link>
        <Link href="/register">
          <button className="secondary">Criar conta</button>
        </Link>
      </div>

      <section className="cards">
        <div>📘 Aulas organizadas</div>
        <div>📝 Exercícios resolvidos</div>
        <div>🎯 Provas comentadas</div>
        <div>🤝 Mentoria</div>
      </section>

      <style jsx>{`
        .container {
          text-align: center;
          padding: 80px 20px;
        }
        .buttons button {
          margin: 10px;
          padding: 12px 24px;
          border: none;
          background: #0057ff;
          color: white;
          border-radius: 6px;
        }
        .secondary {
          background: #eee;
          color: #333;
        }
        .cards {
          margin-top: 60px;
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
          gap: 20px;
        }
        .cards div {
          background: white;
          padding: 20px;
          border-radius: 8px;
        }
      `}</style>
    </main>
  );
}
