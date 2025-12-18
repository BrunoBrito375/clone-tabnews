import { useRouter } from "next/router";

export default function Register() {
  const router = useRouter();

  function handleSubmit(e) {
    e.preventDefault();

    const name = e.target.name.value;
    const email = e.target.email.value;
    const password = e.target.password.value;

    if (!name || !email || !password) {
      alert("Preencha todos os campos");
      return;
    }

    // Simulação de cadastro (backend real entra depois)
    localStorage.setItem("user", email);

    alert("Conta criada com sucesso!");
    router.push("/dashboard");
  }

  return (
    <form onSubmit={handleSubmit} className="form">
      <h2>Criar Conta</h2>

      <input name="name" placeholder="Nome completo" />
      <input name="email" type="email" placeholder="Email" />
      <input name="password" type="password" placeholder="Senha" />

      <button>Cadastrar</button>

      <style jsx>{`
        .form {
          max-width: 420px;
          margin: 100px auto;
          background: white;
          padding: 30px;
          border-radius: 8px;
        }

        input,
        button {
          width: 100%;
          padding: 12px;
          margin-bottom: 15px;
          font-size: 14px;
        }

        button {
          background: #0057ff;
          color: white;
          border: none;
          border-radius: 6px;
        }
      `}</style>
    </form>
  );
}
