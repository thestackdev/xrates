import { exchangeRates, inputValue, selectedCurrency } from 'signals/state'

export default function () {
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
    <div className="flex flex-col sm:flex-row w-full justify-evenly md:w-2/3 mx-auto items-center h-[calc(100vh-50px)]">
      <div className="flex flex-row items-center">
        <div className="group inline-block relative">
          <button className="text-gray-700 dark:text-white font-semibold py-2 px-4 inline-flex items-center">
            <span className="mr-1 mt-3 md:mt-14 text-4xl h-[50px] md:h-[100px] md:text-5xl">
              {selectedCurrency.value.from}
            </span>
            <svg
              className="fill-current h-4 w-4"
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 20 20"
            >
              <path d="M9.293 12.95l.707.707L15.657 8l-1.414-1.414L10 10.828 5.757 6.586 4.343 8z" />
            </svg>
          </button>
          <ul className="absolute hidden text-gray-700 pt-1 group-hover:block w-full h-[30vh] overflow-y-scroll">
            {exchangeRates.value.map((e, index) => (
              <li
                key={index}
                onClick={(e) => {
                  selectedCurrency.value = {
                    ...selectedCurrency.value,
                    from: e.target.innerHTML,
                  }
                }}
                className="dark:bg-gray-700 dark:hover:bg-gray-500 dark:text-white bg-gray-200 hover:bg-gray-400 py-2 px-4 block whitespace-no-wrap"
              >
                {e.symbol}
              </li>
            ))}
          </ul>
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
      <svg
        xmlns="http://www.w3.org/2000/svg"
        fill="none"
        viewBox="0 0 24 24"
        strokeWidth={1.5}
        stroke="currentColor"
        className="w-10 h-10 stroke-gray-900 dark:stroke-white"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          d="M7.5 21L3 16.5m0 0L7.5 12M3 16.5h13.5m0-13.5L21 7.5m0 0L16.5 12M21 7.5H7.5"
        />
      </svg>

      <div className="flex flex-row items-center">
        <div className="group inline-block relative">
          <button className="text-gray-700 dark:text-white font-semibold py-2 px-4 inline-flex items-center">
            <span className="mr-1 mt-3 md:mt-14 text-4xl h-[50px] md:h-[100px] md:text-5xl">
              {selectedCurrency.value.to}
            </span>
            <svg
              className="fill-current h-4 w-4"
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 20 20"
            >
              <path d="M9.293 12.95l.707.707L15.657 8l-1.414-1.414L10 10.828 5.757 6.586 4.343 8z" />
            </svg>
          </button>
          <ul className="absolute hidden text-gray-700 pt-1 group-hover:block w-full h-[30vh] overflow-y-scroll">
            {exchangeRates.value.map((e, index) => (
              <li
                key={index}
                onClick={(e) => {
                  selectedCurrency.value = {
                    ...selectedCurrency.value,
                    to: e.target.innerHTML,
                  }
                }}
                className="dark:bg-gray-700 dark:hover:bg-gray-500 dark:text-white bg-gray-200 hover:bg-gray-400 py-2 px-4 block whitespace-no-wrap"
              >
                {e.symbol}
              </li>
            ))}
          </ul>
        </div>
        <input
          type="number"
          id="xrates-to"
          className="block p-4 h-[50px] md:h-[100px] text-5xl md:text-7xl w-full md:max-w-sm border-transparent focus:border-transparent focus:ring-0 text-gray-900 bg-transparent rounded-lg border border-none dark:placeholder-gray-400 dark:text-white"
          placeholder="0.00"
          maxLength="4"
          required
          value={inputValue.value.to}
          onChange={(e) => handleChange(e.target.value, 'to')}
        />
      </div>
    </div>
  )
}
