"use client"
import { useRouter } from "next/navigation"
import { Footer, Logo } from "../components"
import { LogOut } from "lucide-react"
import { useEffect, useState } from "react"
import { UserData } from "../types/userData"

export default function OrderLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  const router = useRouter()
  const [userData, setUserData] = useState<UserData>(null)

  useEffect(() => {
    const userString = sessionStorage.getItem("user")
    const unParsedUserData = userString ? JSON.parse(userString) : null

    setUserData(unParsedUserData || null)
  }, [])

  const handleLogout = () => {
    sessionStorage.removeItem("token")
    sessionStorage.removeItem("user")
    router.push("/")
  }

  return (
    <main className="bg-gray-200 min-h-screen">
      <div className="container mx-auto mb-6">
        <header className="py-6 flex justify-between items-center">
          <span className="flex items-center gap-1">
            <Logo />
          </span>
          {userData ? (
            <ul className="flex items-center gap-6">
              <li className="text-gray-700">Olá: {userData?.name}</li>
              <li>
                <span
                  className="cursor-pointer text-gray-700 hover:text-amber-600"
                  onClick={handleLogout}
                >
                  <LogOut />
                </span>
              </li>
            </ul>
          ) : null}
        </header>
        <section className="flex flex-col justify-center items-center min-h-96 gap-2">
          {children}
        </section>
      </div>
    </main>
  )
}
