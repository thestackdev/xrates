import { signal } from '@preact/signals-react'

export const searchValue = signal('')
export const exchangeRates = signal([])
export const filterExchangeRates = signal([])

// Converter
export const selectedCurrency = signal({ from: 'EUR', to: 'INR' })
export const inputValue = signal({ from: '', to: '' })
