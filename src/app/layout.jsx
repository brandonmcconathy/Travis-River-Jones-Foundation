import './globals.css'
import { lora } from '../../utils/fonts'
import { Providers } from './providers'
import Head from 'next/head'
import Navbar from './components/navbar'

export const metadata = {
  title: 'Travis River Jones Foundation',
}

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <head>
        <meta name="google-site-verification" content="BsakePwClBRz3ovsATIKGw-IzMm9TFFcBX4YIGLa0RY" />
      </head>
      <body className={lora.className}>
        <Providers>
          <Navbar />
          <main className='m-4'>
            {children}
          </main>
        </Providers>
      </body>
    </html>
  )
}
