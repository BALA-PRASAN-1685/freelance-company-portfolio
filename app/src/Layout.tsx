import { ReactNode } from 'react'
import Navbar from './sections/Navbar'
import Footer from './sections/Footer'

export default function Layout({ children }: { children: ReactNode }) {
  return (
    <div className="min-h-screen flex flex-col bg-white">
      <Navbar />
      <main className="flex-1 pt-[72px]">
        {children}
      </main>
      <Footer />
    </div>
  )
}
