"use client";
import { useState } from "react";
export default function Login() {
  const baseURL = "https://burgerlivery-api.vercel.app";

  const [login, setLogin] = useState("");
  const [password, setPassword] = useState("");

  const handleLogin = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { value } = event.target;
    setLogin(value);
  };
  const handlePassword = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { value } = event.target;
    setPassword(value);
  };

  const handleClick = async () => {
    const params = {
      login: login,
      password: password,
    };

    try {
      const response = await fetch(`${baseURL}/user/login`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(params),
      });

      console.log(response.ok);
      if (!response.ok) {
        alert("Erro no login");
        throw new Error("Erro ao fazer login");
      } else {
        alert("Login realizado");
      }

      //console.log(response);
    } catch (error) {
      console.error(error);
    } finally {
    }
  };

  return (
    <section className="w-80 mx-auto p-4 bg-gray-200 rounded-1g">
      <h1 className="text-2xl font-light text-center mb-4">Login</h1>
      <form>
        <div className="flex flex-col mb-4 gap-2">
          <label htmlFor="login">Login</label>
          <input
            onChange={handleLogin}
            type="text"
            name="login"
            id="login"
            placeholder="Digite seu e-mail"
          ></input>
        </div>
        <div className="flex flex-col mb-4 gap-2">
          <label htmlFor="password">Senha</label>
          <input onChange={handlePassword} type="password" name="password" />
        </div>
        <button
          type="button"
          onClick={handleClick}
          className="
    py-2 px-6 rounded-1g bg-amber -300
    text-amber-600 text-center font-semibold
    border border-amber-400"
        >
          Entrar
        </button>
      </form>
    </section>
  );
}
