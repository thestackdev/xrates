import { Inter } from '@next/font/google'
import Navbar from 'components/Navbar'
import 'styles/globals.css'

const inter = Inter({ subsets: ['latin'] })

export default function ({ Component, pageProps }) {
  return (
    <main className={inter.className}>
      <Navbar />
      <Component {...pageProps} />
    </main>
  )
}
