import { useState, useMemo } from 'react'
import { useCategories } from '../../context/CategoriesContext'
import { useBudget } from '../../context/BudgetContext'
import { useTransactions } from '../../context/TransactionsContext'
import { getCategoryColor } from '../../constants'

export default function BudgetForm () {
  const { categories } = useCategories()
  const { budgets, setBudget, removeBudget } = useBudget()
  const { transactions } = useTransactions()
  const [categoryId, setCategoryId] = useState(categories[0]?.id || '')
  const [amount, setAmount] = useState('')

  const now = new Date()
  const month = `${now.getFullYear()}-${String(now.getMonth() + 1).padStart(2, '0')}`

  const spending = useMemo(() => {
    const map = {}
    transactions
      .filter((t) => t.type === 'expense' && t.date.startsWith(month))
      .forEach((t) => {
        map[t.category] = (map[t.category] || 0) + Number(t.amount)
      })
    return map
  }, [transactions, month])

  const handleSubmit = (e) => {
    e.preventDefault()
    if (!categoryId || !amount) return
    setBudget(categoryId, Number(amount))
    setAmount('')
  }

  return (
    <section>
      <h2>Monthly Budget</h2>
      <form className='budget-form' onSubmit={handleSubmit}>
        <select value={categoryId} onChange={(e) => setCategoryId(e.target.value)}>
          {categories.map((c) => (
            <option key={c.id} value={c.id}>{c.name}</option>
          ))}
        </select>
        <input
          type='number'
          min='0'
          step='0.01'
          placeholder='Amount'
          value={amount}
          onChange={(e) => setAmount(e.target.value)}
        />
        <button type='submit' className='submit'>Set Budget</button>
      </form>

      <ul className='budget-list'>
        {categories.map((c) => {
          const limit = budgets[c.id] || 0
          const spent = spending[c.id] || 0
          const over = limit > 0 && spent > limit
          const pct = limit > 0 ? Math.min((spent / limit) * 100, 100) : 0
          const color = getCategoryColor(categories, c.id)
          return (
            <li key={c.id} className={'budget-item' + (over ? ' over' : '')}>
              <div className='budget-item-header'>
                <div>
                  <strong>{c.name}</strong>
                  <span> ${spent.toFixed(2)} / ${limit.toFixed(2)}</span>
                </div>
                {limit > 0 && (
                  <button type='button' className='submit' onClick={() => removeBudget(c.id)}>Remove</button>
                )}
              </div>
              {limit > 0 && (
                <>
                  <div
                    className='progress'
                    role='progressbar'
                    aria-valuenow={pct}
                    aria-valuemin={0}
                    aria-valuemax={100}
                  >
                    <div className='progress-fill' style={{ width: `${pct}%`, backgroundColor: color }} />
                  </div>
                  {over && (
                    <span className='over-budget-text'>Over budget by ${(spent - limit).toFixed(2)}</span>
                  )}
                </>
              )}
            </li>
          )
        })}
      </ul>
    </section>
  )
}
