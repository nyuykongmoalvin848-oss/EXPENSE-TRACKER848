import TransactionItem from './TransactionItem'
import NoTransactions from '../NoTransactions'
import NoSearchResults from '../NoSearchResults'

export default function TransactionList ({ transactions, total, onDelete, onEdit }) {
  if (!transactions.length) {
    if (!total) return <NoTransactions />
    return <NoSearchResults />
  }

  return (
    <ul className='list'>
      {transactions.map((t) => (
        <TransactionItem key={t.id} transaction={t} onDelete={onDelete} onEdit={onEdit} />
      ))}
    </ul>
  )
}