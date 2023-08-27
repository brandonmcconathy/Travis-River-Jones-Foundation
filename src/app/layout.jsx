import './globals.css'
import { Inter } from 'next/font/google'
import { Providers } from './providers'
import Navbar from './components/navbar'

const inter = Inter({ subsets: ['latin'] })

export const metadata = {
  title: 'Create Next App',
}

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <Providers>
          <Navbar />
          <div className='m-4'>
            {children}
          </div>
        </Providers>
      </body>
    </html>
  )
}
