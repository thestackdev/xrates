import { MagnifyingGlassIcon } from '@heroicons/react/24/outline'
import { useEffect, useState } from 'react'

export default function ({ rates }) {
  const [searchValue, setSearchValue] = useState('')
  const [filteredRates, setFilteredRates] = useState(rates)

  useEffect(() => {
    if (searchValue === '') {
      setFilteredRates(rates)
      return
    }
    setFilteredRates(
      rates.filter(
        (rate) =>
          rate.symbol.toLowerCase().includes(searchValue.toLowerCase()) ||
          rate.name.toLowerCase().includes(searchValue.toLowerCase())
      )
    )
  }, [searchValue])

  return (
    <div className="overflow-x-auto overflow-y-auto w-full mx-auto md:w-1/2 relative shadow-md sm:rounded-lg my-10">
      <div className="pb-4 bg-white dark:bg-gray-900">
        <label htmlFor="table-search" className="sr-only">
          Search
        </label>
        <div className="relative mt-1">
          <div className="flex absolute inset-y-0 left-0 items-center pl-3 pointer-events-none">
            <MagnifyingGlassIcon className="w-5 h-5 text-gray-500 dark:text-gray-400" />
          </div>
          <input
            type="text"
            value={searchValue}
            onChange={(e) => setSearchValue(e.target.value)}
            className="block p-2 pl-10 w-80 text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
            placeholder="Search for rates"
          />
        </div>
      </div>
      <table className="w-full text-sm text-left text-gray-500 dark:text-gray-400">
        <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
          <tr>
            <th scope="col" className="py-3 px-6">
              Currency Symbol
            </th>
            <th scope="col" className="py-3 px-6">
              Currency Name
            </th>
            <th scope="col" className="py-3 px-6">
              Exchange Rate (EUR)
            </th>
          </tr>
        </thead>
        <tbody>
          {filteredRates.map((e, index) => (
            <tr
              key={index}
              className="bg-white border-b dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600"
            >
              <th
                scope="row"
                className="py-4 px-6 font-medium text-gray-900 whitespace-nowrap dark:text-white"
              >
                {e.symbol}
              </th>
              <td className="py-4 px-6">{e.name}</td>
              <td className="py-4 px-6">{e.exchageRate}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}

export async function getStaticProps() {
  const response = { rates: null, symbols: null }
  const exchangeRates = `${process.env.EXCHANGE_RATES_BASE_URL}/latest?apikey=${process.env.EXCHANGE_RATES_TOKEN}`
  const exchangeSymbols = `${process.env.EXCHANGE_RATES_BASE_URL}/symbols?apikey=${process.env.EXCHANGE_RATES_TOKEN}`
  const exchangeResponse = await fetch(exchangeRates).then((res) => res.json())
  response.rates = exchangeResponse.rates

  const symbolResponse = await fetch(exchangeSymbols).then((res) => res.json())
  response.symbols = symbolResponse.symbols

  const rates = Object.keys(response.symbols).map((e) => ({
    symbol: e,
    name: response.symbols[e],
    exchageRate: response.rates[e],
  }))

  return {
    props: { rates },
    revalidate: 1000 * 60 * 60 * 6,
  }
}
