import { MagnifyingGlassIcon } from '@heroicons/react/24/outline'
import { batch } from '@preact/signals-react'
import { exchangeRates, filterExchangeRates, searchValue } from 'signals/state'

export default function () {
  const handleChange = (e) => {
    batch(() => {
      searchValue.value = e.target.value
      filterExchangeRates.value =
        e.target.value === ''
          ? exchangeRates.value
          : exchangeRates.value.filter(
              (rate) =>
                rate.symbol
                  .toLowerCase()
                  .includes(e.target.value.toLowerCase()) ||
                rate.name.toLowerCase().includes(e.target.value.toLowerCase())
            )
    })
  }

  return (
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
          id="table-search"
          value={searchValue}
          onChange={handleChange}
          className="block p-2 pl-10 w-80 text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
          placeholder="Search for rates"
        />
      </div>
    </div>
  )
}
