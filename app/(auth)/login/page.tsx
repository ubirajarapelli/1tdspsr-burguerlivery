"use client"
import React, { useState } from "react"
import axios from "axios"
import { useRouter } from "next/navigation"
import { FormButton, Logo } from "@/app/components"

export default function Login() {
  const router = useRouter()
  const baseURL = "https://burgerlivery-api.vercel.app"

  const [login, setLogin] = useState("")
  const [password, setPassword] = useState("")
  const [errorMessage, setErrorMessage] = useState("")
  const [hasError, setHasError] = useState(false)

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
      const response = await axios.post(`${baseURL}/user/login`, {
        ...params,
      })

      const token = response.data.token

      const userData = {
        name: response.data.userName,
        email: response.data.email,
      }

      sessionStorage.setItem("token", token)
      sessionStorage.setItem("user", JSON.stringify(userData))
      router.push("/pages/hamburgers")
    } catch (error) {
      setHasError(true)
      if (axios.isAxiosError(error)) {
        setErrorMessage(error.response?.data?.message || "Erro ao fazer login.")
      }
    }
  }
  return (
    <>
      <div>
        <span className="flex items-center gap-1 mb-2">
          <Logo />
        </span>
      </div>
      <section className="w-80 mx-auto p-4 bg-white rounded-lg shadow">
        <h1 className="text-2xl font-light text-center mb-4">
          Bem vindo de volta
        </h1>
        {hasError ? (
          <p className="text-center mb-4 text-red-700">{errorMessage}</p>
        ) : null}
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
          <FormButton onClick={handleClick}>Entrar</FormButton>
        </form>
      </section>
    </>
  )
}
