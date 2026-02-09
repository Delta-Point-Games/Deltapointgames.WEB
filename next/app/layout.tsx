import type { Metadata } from "next"
import "./globals.css"

export const metadata: Metadata = {
  title: "Delta Point Games",
  description: "Delta Point Games — indie studio making games.",
  icons: {
    icon: "/Assets/Images/DPGIcon.png"
  }
}

export default function RootLayout({
  children
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  )
}
