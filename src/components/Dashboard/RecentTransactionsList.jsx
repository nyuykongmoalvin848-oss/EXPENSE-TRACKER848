import { useCategories } from '../../context/CategoriesContext'
import { getCategoryColor } from '../../constants'

function RecentTransactionsList ({ transactions }) {
  const { categories } = useCategories()
  const recent = [...transactions]
    .sort((a, b) => new Date(b.date) - new Date(a.date))
    .slice(0, 5)

  if (recent.length === 0) {
    return <p className='empty-state'>No recent transactions.</p>
  }

  return (
    <ul className='list'>
      {recent.map((t) => {
        const cat = categories.find((c) => c.id === t.category)
        const color = getCategoryColor(categories, t.category)
        return (
          <li key={t.id} className={`list-item ${t.type}`}>
            <span className='cat-dot' style={{ backgroundColor: color }} />
            <div className='tx-info'>
              <span className='tx-desc'>{t.description}</span>
              <span className='tx-meta'>
                {cat?.name || 'Uncategorised'} · {t.date}
              </span>
            </div>
            <span className='tx-amount'>
              {t.type === 'income' ? '+' : '-'}${Number(t.amount).toFixed(2)}
            </span>
          </li>
        )
      })}
    </ul>
  )
}

export default RecentTransactionsList