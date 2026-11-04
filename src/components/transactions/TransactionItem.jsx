import { useCategories } from '../../context/CategoriesContext'
import { getCategoryColor, formatCurrency } from '../../constants'

export default function TransactionItem ({ transaction, onDelete, onEdit }) {
  const { categories } = useCategories()
  const cat = categories.find((c) => c.id === transaction.category)
  const color = getCategoryColor(categories, transaction.category)
 
  return (
    <li className={`list-item ${transaction.type}`}>
      <span className='cat-dot' style={{ backgroundColor: color }} />
      <div className='tx-info'>
        <span className='tx-desc'>{transaction.description}</span>
        <span className='tx-meta'>
          {cat?.name || 'Uncategorised'} · {transaction.date}
          {transaction.note ? ` · ${transaction.note}` : ''}
        </span>
      </div>
      <span className='tx-amount'>
        {transaction.type === 'income' ? '+' : '-'}{formatCurrency(transaction.amount)}
      </span>
      <button className='submit' onClick={() => onEdit(transaction)}>Edit</button>
      <button className='btn-delete' onClick={() => onDelete(transaction.id)}>Delete</button>
    </li>
  )
}
