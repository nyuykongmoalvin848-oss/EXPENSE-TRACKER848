import { useState, useEffect } from 'react'
import { useCategories } from '../../context/CategoriesContext'
 
const today = () => new Date().toISOString().split('T')[0]
 
function emptyTx () {
  return { description: '', amount: '', type: 'expense', category: 'food', date: today(), note: '' }
}
 
export default function TransactionForm ({ onSubmit, initial, submitLabel = 'Add', onCancel }) {
  const { categories } = useCategories()
  const [form, setForm] = useState(initial ? { ...initial, amount: initial.amount } : emptyTx())
  const [error, setError] = useState('')
 
  useEffect(() => {
    if (initial) setForm({ ...initial, amount: initial.amount })
    else setForm(emptyTx())
  }, [initial])
 
  const set = (key, value) => setForm({ ...form, [key]: value })
 
  const handleSubmit = (e) => {
    e.preventDefault()
    const amount = parseFloat(form.amount)
    if (!form.description || !form.amount || !Number.isFinite(amount) || amount <= 0) {
      setError('Enter a valid amount greater than zero')
      return
    }
    setError('')
    onSubmit({ ...form, amount })
    if (!initial) setForm(emptyTx())
  }
 
  return (
    <form className='form' onSubmit={handleSubmit}>
      <div className='form-type'>
        <button type='button' className={form.type === 'income' ? 'active' : ''} onClick={() => set('type', 'income')}>Income</button>
        <button type='button' className={form.type === 'expense' ? 'active' : ''} onClick={() => set('type', 'expense')}>Expense</button>
      </div>
 
      <input type='text' placeholder='Description' value={form.description} onChange={(e) => set('description', e.target.value)} />
 
      <input type='number' placeholder='Amount' value={form.amount} onChange={(e) => set('amount', e.target.value)} />
 
      <select value={form.category} onChange={(e) => set('category', e.target.value)}>
        {categories.map((c) => (
          <option key={c.id} value={c.id}>{c.name}</option>
        ))}
      </select>
 
      <input type='date' value={form.date} onChange={(e) => set('date', e.target.value)} />
 
      <input type='text' placeholder='Note (optional)' value={form.note} onChange={(e) => set('note', e.target.value)} />
 
      <div className='form-actions'>
        <button type='submit' className='submit'>{submitLabel}</button>
        {onCancel && <button type='button' className='btn-cancel' onClick={onCancel}>Cancel</button>}
      </div>
      {error && <p className='form-error'>{error}</p>}
    </form>
  )
}
