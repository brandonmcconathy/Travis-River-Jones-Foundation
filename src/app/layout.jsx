import './globals.css'
import { lora } from '../../utils/fonts'
import { Providers } from './providers'
import Navbar from './components/navbar'

export const metadata = {
  title: 'Travis River Jones Foundation',
}

export default function RootLayout({ children }) {
  return (
    <html lang="en">
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
