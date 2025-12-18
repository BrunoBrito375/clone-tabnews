import { useEffect } from "react";
import { useRouter } from "next/router";
import { isAuthenticated, logout } from "../services/auth";

export default function Dashboard() {
  const router = useRouter();

  useEffect(() => {
    if (!isAuthenticated()) {
      router.push("/login");
    }
  }, []);

  return (
    <main className="container">
      <h1>Área do Aluno</h1>

      <ul>
        <li>
          <a href="#">📘 Cálculo I</a>
        </li>
        <li>
          <a href="#">📗 Física I</a>
        </li>
        <li>
          <a href="#">📕 Álgebra Linear</a>
        </li>
      </ul>

      <button
        onClick={() => {
          logout();
          router.push("/");
        }}
      >
        Sair
      </button>

      <style jsx>{`
        .container {
          padding: 60px;
        }
        ul li {
          margin-bottom: 15px;
        }
      `}</style>
    </main>
  );
}
