import axios from 'axios'
import cache from 'memory-cache'

export default async function (req, res) {
  try {
    const response = { rates: null, symbols: null }
    const exchangeRates = `${process.env.EXCHANGE_RATES_BASE_URL}/latest?apikey=${process.env.EXCHANGE_RATES_TOKEN}`
    const exchangeSymbols = `${process.env.EXCHANGE_RATES_BASE_URL}/symbols?apikey=${process.env.EXCHANGE_RATES_TOKEN}`
    response.rates = cache.get(exchangeRates)
    response.symbols = cache.get(exchangeSymbols)

    if (!response.rates) {
      const exchangeResponse = await axios.get(exchangeRates)
      response.rates = exchangeResponse.data.rates
      cache.put(exchangeRates, response.rates, 1000 * 60 * 60 * 6) // cached for 6 hours
    }

    if (!response.symbols) {
      const symbolResponse = await axios.get(exchangeSymbols)
      response.symbols = symbolResponse.data.symbols
      cache.put(exchangeSymbols, response.symbols, 1000 * 60 * 60 * 6) // cached for 6 hours
    }

    const prettyResponse = Object.keys(response.symbols).map((e) => ({
      symbol: e,
      name: response.symbols[e],
      exchageRate: response.rates[e],
    }))

    res.status(200).send(prettyResponse)
  } catch (error) {
    console.log(error)
    res.status(500).json({ message: 'Something went wrong' })
  }
}
