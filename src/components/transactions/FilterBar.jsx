import { useState, useEffect } from 'react'
import { useCategories } from '../../context/CategoriesContext'

export default function FilterBar ({ filters, onChange }) {
  const { categories } = useCategories()
  const [search, setSearch] = useState(filters.search || '')

  useEffect(() => {
    const id = setTimeout(() => onChange({ ...filters, search }), 300)
    return () => clearTimeout(id)
  }, [search])

  const months = []
  const now = new Date()
  for (let i = 0; i < 12; i++) {
    const d = new Date(now.getFullYear(), now.getMonth() - i, 1)
    const year = d.getFullYear()
    const month = String(d.getMonth() + 1).padStart(2, '0')
    months.push({ value: `${year}-${month}`, label: d.toLocaleString('en-US', { month: 'long', year: 'numeric' }) })
  }

  const set = (key, value) => onChange({ ...filters, [key]: value })

  return (
    <div className='filter-bar'>
      <input
        type='text'
        placeholder='Search notes...'
        value={search}
        onChange={(e) => setSearch(e.target.value)}
      />
      <select value={filters.month || ''} onChange={(e) => set('month', e.target.value)}>
        <option value=''>All months</option>
        {months.map((m) => <option key={m.value} value={m.value}>{m.label}</option>)}
      </select>
      <select value={filters.type || ''} onChange={(e) => set('type', e.target.value)}>
        <option value=''>All types</option>
        <option value='income'>Income</option>
        <option value='expense'>Expense</option>
      </select>
      <select value={filters.category || ''} onChange={(e) => set('category', e.target.value)}>
        <option value=''>All categories</option>
        {categories.map((c) => <option key={c.id} value={c.id}>{c.name}</option>)}
      </select>
    </div>
  )
}
