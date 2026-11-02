import { useState, useMemo } from 'react'
import { useTransactions } from '../context/TransactionsContext'
import TransactionForm from '../components/transactions/TransactionForm'
import TransactionList from '../components/transactions/TransactionList'
import FilterBar from '../components/transactions/FilterBar'

export default function TransactionsPage () {
  const { transactions, addTransaction, deleteTransaction, updateTransaction } = useTransactions()
  const [filters, setFilters] = useState({ month: '', type: '', category: '', search: '' })
  const [editing, setEditing] = useState(null)
 
  const filtered = useMemo(() => {
    const search = filters.search.trim().toLowerCase()
    const matched = transactions.filter((t) => {
      if (filters.month && !t.date.startsWith(filters.month)) return false
      if (filters.type && t.type !== filters.type) return false
      if (filters.category && t.category !== filters.category) return false
      if (search && !(t.note || '').toLowerCase().includes(search)) return false
      return true
    })
    return [...matched].sort((a, b) => b.date.localeCompare(a.date) || (Number(b.id) - Number(a.id)))
  }, [transactions, filters])
 
  const handleSubmit = (tx) => {
    if (editing) {
      updateTransaction(editing.id, tx)
      setEditing(null)
    } else {
      addTransaction(tx)
    }
  }
 
  return (
    <>
      <TransactionForm onSubmit={handleSubmit} initial={editing} submitLabel={editing ? 'Update' : 'Add'} onCancel={editing ? () => setEditing(null) : undefined} />
      <FilterBar filters={filters} onChange={setFilters} />
      <div className='list-header'>
        <h3>Transactions ({filtered.length})</h3>
      </div>
      <TransactionList transactions={filtered} onDelete={deleteTransaction} onEdit={setEditing} />
    </>
  )
}
