import { type ReactNode } from 'react'

import { Navbar } from './Navbar'

export function Layout({ children }: { children: ReactNode }) {
  return (
    <>
      <Navbar />

      <main className="mt-12 max-w-7xl m-auto sm:px-4 h-[calc(100%-48px)]">{children}</main>
    </>
  )
}
