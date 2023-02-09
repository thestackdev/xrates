import {
  ArrowsRightLeftIcon,
  ChevronDownIcon,
} from '@heroicons/react/24/outline'
import CurrencyModal from 'components/CurrencyModal'
import { useEffect, useState } from 'react'
import {
  exchangeRates,
  filterExchangeRates,
  inputValue,
  selectedCurrency,
} from 'signals/state'

export default function ({ rates }) {
  const [currencyModalFrom, setCurrencyModalFrom] = useState(false)
  const [currencyModalTo, setCurrencyModalTo] = useState(false)

  useEffect(() => {
    exchangeRates.value = rates
    filterExchangeRates.value = rates
  }, [])

  const handleChange = (e, type) => {
    if (e === '') {
      inputValue.value = { to: '', from: '' }
      return
    }

    const filteredToRate = exchangeRates.value.filter(
      (e) => e.symbol.toLowerCase() === selectedCurrency.value.to.toLowerCase()
    )[0]

    const filteredFromRate = exchangeRates.value.filter(
      (e) =>
        e.symbol.toLowerCase() === selectedCurrency.value.from.toLowerCase()
    )[0]

    inputValue.value = {
      from:
        type === 'from'
          ? e
          : (
              (Number(e) * filteredFromRate.exchageRate) /
              filteredToRate.exchageRate
            ).toFixed(2),
      to:
        type === 'from'
          ? (
              (Number(e) * filteredToRate.exchageRate) /
              filteredFromRate.exchageRate
            ).toFixed(2)
          : e,
    }
  }

  return (
    <div className="flex flex-col items-center sm:flex-row w-full justify-evenly md:w-2/3 mx-auto">
      <div className="flex flex-row">
        <CurrencyModal
          visible={currencyModalFrom}
          exchangeRates={exchangeRates}
          closeModal={() => setCurrencyModalFrom(false)}
          handleClick={(e) => {
            selectedCurrency.value = {
              ...selectedCurrency.value,
              from: e.target.innerHTML,
            }
            setCurrencyModalFrom(false)
            inputValue.value = { to: '', from: '' }
          }}
        />
        <div className="group">
          <button
            className="text-white focus:outline-none font-medium rounded-lg text-center inline-flex items-center dark:hover:bg-gray-700 px-2 text-4xl h-[50px] md:h-[100px] md:text-5xl relative"
            type="button"
            onClick={() => setCurrencyModalFrom(true)}
          >
            {selectedCurrency.value.from}
            <ChevronDownIcon className="w-4 h-4 ml-2" />
          </button>
        </div>
        <input
          type="number"
          id="xrates-from"
          className="block p-4 h-[50px] md:h-[100px] text-5xl md:text-7xl w-full md:max-w-sm border-transparent focus:border-transparent focus:ring-0 text-gray-900 bg-transparent rounded-lg border border-none dark:placeholder-gray-400 dark:text-white"
          placeholder="0.00"
          maxLength="4"
          value={inputValue.value.from}
          onChange={(e) => handleChange(e.target.value, 'from')}
          required
        />
      </div>
      <ArrowsRightLeftIcon className="w-10 h-10 mx-4 stroke-gray-900 dark:stroke-white" />
      <div className="flex flex-row">
        <CurrencyModal
          visible={currencyModalTo}
          exchangeRates={exchangeRates}
          closeModal={() => setCurrencyModalTo(false)}
          handleClick={(e) => {
            selectedCurrency.value = {
              ...selectedCurrency.value,
              to: e.target.innerHTML,
            }
            setCurrencyModalTo(false)
            inputValue.value = { to: '', from: '' }
          }}
        />
        <div className="group">
          <button
            className="text-white focus:outline-none font-medium rounded-lg text-center inline-flex items-center dark:hover:bg-gray-700 px-2 text-4xl h-[50px] md:h-[100px] md:text-5xl relative"
            type="button"
            onClick={() => setCurrencyModalTo(true)}
          >
            {selectedCurrency.value.to}
            <ChevronDownIcon className="w-4 h-4 ml-2" />
          </button>
        </div>
        <input
          type="number"
          id="xrates-to"
          className="block p-4 h-[50px] md:h-[100px] text-5xl md:text-7xl w-full md:max-w-sm border-transparent focus:border-transparent focus:ring-0 text-gray-900 bg-transparent rounded-lg border border-none dark:placeholder-gray-400 dark:text-white"
          placeholder="0.00"
          maxLength="4"
          value={inputValue.value.to}
          onChange={(e) => handleChange(e.target.value, 'to')}
          required
        />
      </div>
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
