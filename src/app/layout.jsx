import './globals.css'
import { inter } from '../../utils/fonts'
import { Providers } from './providers'
import Navbar from './components/navbar'

export const metadata = {
  title: 'Travis River Jones Foundation',
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
