import 'styles/globals.css'
import { Inter } from '@next/font/google'
import Navbar from 'components/Navbar'
import { useEffect } from 'react'
import axios from 'axios'
import { exchangeRates, filterExchangeRates } from 'signals/state'

const inter = Inter({ subsets: ['latin'] })

export default function ({ Component, pageProps }) {
  useEffect(() => {
    fetchExchangeRates()
  }, [])

  const fetchExchangeRates = async () => {
    try {
      const response = await axios.get('/api')
      exchangeRates.value = response.data
      filterExchangeRates.value = response.data
    } catch (error) {
      console.log(error)
    }
  }

  return (
    <main className={inter.className}>
      <Navbar />
      <Component {...pageProps} />
    </main>
  )
}
