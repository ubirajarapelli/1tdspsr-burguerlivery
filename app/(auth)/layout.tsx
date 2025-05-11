export default function AuthLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <main className="bg-gray-50 h-screen flex flex-col items-center justify-center">
      {children}
    </main>
  )
}
