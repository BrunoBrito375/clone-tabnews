import { useRouter } from "next/router";
import { login } from "../services/auth";

export default function Login() {
  const router = useRouter();

  function handleSubmit(e) {
    e.preventDefault();
    const email = e.target.email.value;
    const password = e.target.password.value;

    if (login(email, password)) {
      router.push("/dashboard");
    }
  }

  return (
    <form onSubmit={handleSubmit} className="form">
      <h2>Login</h2>
      <input name="email" placeholder="Email" />
      <input name="password" type="password" placeholder="Senha" />
      <button>Entrar</button>

      <style jsx>{`
        .form {
          max-width: 400px;
          margin: 100px auto;
          background: white;
          padding: 30px;
          border-radius: 8px;
        }
        input,
        button {
          width: 100%;
          margin-bottom: 15px;
          padding: 10px;
        }
      `}</style>
    </form>
  );
}
