import { MagnifyingGlassIcon, XMarkIcon } from '@heroicons/react/24/outline'
import { useEffect, useState } from 'react'

export default function CurrencyModal({
  exchangeRates,
  visible,
  closeModal,
  handleClick,
}) {
  const [search, setSearch] = useState('')
  const [filtered, setFiltered] = useState(exchangeRates)

  useEffect(() => {
    if (search.length > 0) {
      const filtered = exchangeRates.value.filter((e) =>
        e.symbol.toLowerCase().includes(search.toLowerCase())
      )
      setFiltered(filtered)
    } else {
      setFiltered(exchangeRates.value)
    }
  }, [search])

  return (
    <div
      className={`${
        visible ? 'flex' : 'hidden'
      } fixed top-0 left-0 right-0 z-50 items-center justify-center backdrop-blur-sm w-full p-4 overflow-x-hidden overflow-y-auto md:inset-0 h-modal md:h-full`}
    >
      <div className="relative w-full h-full max-w-2xl md:h-auto">
        <div className="relative bg-white rounded-lg shadow dark:bg-gray-700">
          <div className="flex items-start justify-between p-4 border-b rounded-t dark:border-gray-600">
            <h3 className="text-xl font-semibold text-gray-900 dark:text-white">
              Select Currency
            </h3>
            <button
              type="button"
              className="text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm p-1.5 ml-auto inline-flex items-center dark:hover:bg-gray-600 dark:hover:text-white"
              onClick={closeModal}
            >
              <XMarkIcon className="w-5 h-5" />
              <span className="sr-only">Close modal</span>
            </button>
          </div>
          <div className="z-10 inline group-hover:block bg-white rounded-lg shadow w-60 dark:bg-gray-700 relative top-0">
            <div className="p-3">
              <label htmlFor="input-group-search" className="sr-only">
                Search
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
                  <MagnifyingGlassIcon className="w-5 h-5 text-gray-500 dark:text-gray-400" />
                </div>
                <input
                  type="text"
                  className="block w-full p-2 pl-10 text-sm text-gray-900 border border-gray-300 rounded-lg bg-gray-50 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                  placeholder="Search currency"
                  value={search}
                  onChange={(e) => setSearch(e.target.value)}
                />
              </div>
            </div>
            <ul
              className="h-48 px-3 pb-3 overflow-y-auto text-sm text-gray-700 dark:text-gray-200"
              aria-labelledby="dropdownSearchButton"
            >
              {filtered.map((e, index) => (
                <li key={index} onClick={handleClick}>
                  <div className="flex items-center pl-2 rounded hover:bg-gray-100 dark:hover:bg-gray-600">
                    <label
                      htmlFor="checkbox-item-12"
                      className="w-full py-2 ml-2 text-sm font-medium text-gray-900 rounded dark:text-gray-300"
                    >
                      {e.symbol}
                    </label>
                  </div>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </div>
  )
}
