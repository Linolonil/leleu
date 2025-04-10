import type React from "react"
import type { Metadata } from "next"
import { Inter } from "next/font/google"
import "./globals.css"
import { ThemeProvider } from "@/components/theme-provider"
import { ConfettiScript } from "@/components/confettiScript"

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
      <body className={inter.className}>
        <ThemeProvider attribute="class" defaultTheme="dark" enableSystem disableTransitionOnChange>
          {children}
          <ConfettiScript />
        </ThemeProvider>
      </body>
    </html>
  )
}
