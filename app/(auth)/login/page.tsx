"use client"
import { log } from "console"
import { Link, Snail } from "lucide-react"
import React, { useState } from "react"

export default function Login() {
  const baseURL = "https://burgerlivery-api.vercel.app"

  const [login, setLogin] = useState("")
  const [password, setPassword] = useState("")

  const handleLogin = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { value } = event.target
    setLogin(value)
  }

  const handlePassword = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { value } = event.target
    setPassword(value)
  }

  const handleClick = async () => {
    const params = {
      login: login,
      password: password,
    }

    try {
      const response = await fetch(`${baseURL}/user/login`, {
        method: "POST",
        body: JSON.stringify(params),
        headers: {
          "Content-Type": "application/json",
        },
      })
      console.log(response)
    } catch (error) {
      console.log(error)
    } finally {
    }
  }
  return (
    <>
      <div>
        <span className="flex items-center gap-1 mb-2">
          <Snail className="text-amber-400" />
          <span className="text-gray-700 font-bold text-xl">Burguerlivery</span>
        </span>
      </div>
      <section className="w-80 mx-auto p-4 bg-white rounded-lg shadow">
        <h1 className="text-2xl font-light text-center mb-4">
          Bem vindo de volta
        </h1>
        <form>
          <div className="flex flex-col mb-4 gap-2">
            <label htmlFor="login">Login</label>
            <input
              className="bg-white p-2 rounded-md border border-gray-400"
              type="text"
              name="login"
              id="login"
              placeholder="Digite seu login"
              onChange={handleLogin}
            />
          </div>
          <div className="flex flex-col mb-4 gap-2">
            <label htmlFor="password">Senha</label>
            <input
              className="bg-white p-2 rounded-md border border-gray-400"
              type="password"
              name="password"
              onChange={handlePassword}
            />
          </div>
          <button
            type="button"
            className="w-full py-2 px-6 rounded-lg bg-amber-300 text-amber-600 text-center font-semibold border border-amber-400"
            onClick={handleClick}
          >
            Entrar
          </button>
        </form>
      </section>
    </>
  )
}
