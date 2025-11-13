/* "use client" */

import React from 'react'
import '../src/index.css'
import Navbar from '../src/components/Navbar'
import Footer from '../src/components/Footer'
import { DataProvider } from '../src/components/context/DataContext'

export const metadata = {
  title: 'Emina Portfolio',
  description: 'Migrated to Next.js'
}

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>
        <DataProvider>
          <Navbar />
          {children}
          <Footer />
        </DataProvider>
      </body>
    </html>
  )
}
