import { createContext, useContext } from 'react'
import { useLocalStorage } from '../hooks/useLocalStorage'

const TransactionsContext = createContext()

export function TransactionsProvider ({ children }) {
  const [transactions, setTransactions] = useLocalStorage('transactions', [])

  const addTransaction = (tx) => {
    setTransactions([{ ...tx, id: crypto.randomUUID() }, ...transactions])
  }

  const deleteTransaction = (id) => {
    if (window.confirm('Delete this transaction?')) {
      setTransactions(transactions.filter((t) => t.id !== id))
    }
  }
 
  const updateTransaction = (id, tx) => {
    setTransactions(transactions.map((t) => (t.id === id ? { ...t, ...tx } : t)))
  }
 
  return (
    <TransactionsContext.Provider value={{ transactions, addTransaction, deleteTransaction, updateTransaction }}>
      {children}
    </TransactionsContext.Provider>
  )
}

export function useTransactions () {
  return useContext(TransactionsContext)
}
