"use client"
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
      password: password
    }

    try {

      const response = await fetch(`${baseURL}/user/login`, {
        method: "POST",
        body: JSON.stringify(params),
        headers: {
          'Content-Type': 'application/json'
        }
      })

      console.log(response)

    } catch (error) {
      console.log(error)

    } finally {

    }

  }
  return (
    <section className="w-80 mx-auto p-4 bg-gray-200 rounded-lg">
      <h1 className="text-2xl font-light text-center mb-4">Login</h1>
      <form>
        <div className="flex flex-col mb-4 gap-2">
          <label htmlFor="login">Login</label>
          <input type="text" name="login" id="login" placeholder="Digite seu login"
            onChange={handleLogin}
          />
        </div>
        <div className="flex flex-col mb-4 gap-2">
          <label htmlFor="password">Senha</label>
          <input type="password" name="password" onChange={handlePassword} />
        </div>
        <button type="button"
          className=" py-2 px-6 rounded-lg bg-amber-300 text-amber-600 text-center font-semibold border border-amber-400"
          onClick={handleClick}
        >Entrar</button>
      </form>
    </section>
  )
}