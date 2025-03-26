import type React from "react"
import "@/styles/globals.css"
import { Inter } from "next/font/google"
import Cursor from "@/components/cursor"
import Favicon from "@/components/favicon"
import { Toaster } from "@/components/ui/toaster"

const inter = Inter({ subsets: ["latin"], weight: ["300", "400", "500", "700"] })

export const metadata = {
  title: "PrismX - Privacy Protection on Solana",
  description:
    "A revolutionary privacy-focused project on the Solana blockchain that uses distributed computing to counter AI surveillance."
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <head>
        <Favicon />
      </head>
      <body className={inter.className}>
        {children}
        <Cursor />
        <Toaster />
      </body>
    </html>
  )
}



import './globals.css'