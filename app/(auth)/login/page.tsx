"use client"
import { useRouter } from "next/navigation"
import React, { useState } from "react"
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
      const response = await fetch(`${baseURL}/user/login`, {
        method: "POST",
        body: JSON.stringify(params),
        headers: {
          "Content-Type": "application/json charset=UTF-8",
          Accept: "application/json",
        },
      })

      if (!response.ok) {
        const errorMessage = await response.json()

        const errorData = {
          status: response.status,
          message: errorMessage.message,
        }
        const error = new Error(JSON.stringify(errorData))
        throw error
      }

      // login: eliane_almeida@gmail.com.br
      // password: Prior8756@

      if (response.ok) {
        const data = await response.json()
        const token = data.token
        const userData = {
          name: data.userName,
          email: data.email,
        }
        // localStorage.setItem("token", token)
        sessionStorage.setItem("token", token)
        sessionStorage.setItem("user", JSON.stringify(userData))
        router.push("/pages/hamburgers")
      }
    } catch (error) {
      const errorData = JSON.parse(error.message)
      setHasError(true)
      setErrorMessage(errorData.message)
      // router.push("/error")
    } finally {
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
