import type React from "react"
import type { Metadata } from "next"
import { Inter } from "next/font/google"
import "./globals.css"
import { Footer } from "@/components/footer"

const inter = Inter({ subsets: ["latin"] })

export const metadata: Metadata = {
  title: "Leandro Negreiros - Aniversário Ninja",
  description: "Celebrando os 29 anos do ninja mais incrível!",
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="pt-BR">
      <body className={inter.className + "w-full"}>
          {children}
      <Footer />
      </body>
    </html>
  )
}
