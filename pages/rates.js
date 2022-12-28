import Search from 'components/Search'
import Spinner from 'components/Spinner'
import { filterExchangeRates } from 'signals/state'

export default function () {
  if (!filterExchangeRates.value)
    return (
      <div className="flex items-center justify-center mt-10">
        <Spinner />
      </div>
    )

  return (
    <div className="overflow-x-auto overflow-y-auto w-full mx-auto md:w-1/2 relative shadow-md sm:rounded-lg my-10">
      <Search />
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
          {filterExchangeRates.value.map((e, index) => (
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
