import { useState, useContext } from 'react'
import { CategoriesContext } from '../../context/CategoriesContext'
import { Palette } from 'lucide-react'

export default function AddCategoryForm () {
  const { setCategories } = useContext(CategoriesContext)
  const [name, setName] = useState('')
  const [color, setColor] = useState('#000000')

  const handleAddCategory = (name, color) => {
    const newCategory = { id: Date.now().toString(), name, color }
    setCategories(prev => [...prev, newCategory])
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    if (!name.trim()) return
    handleAddCategory(name.trim(), color)
    setName('')
    setColor('#000000')
  }

  return (
    <form className='form' onSubmit={handleSubmit}>
      <h3>Add Custom Category</h3>
      <input type='text' placeholder='Category Name' value={name} onChange={(e) => setName(e.target.value)} />
      <label className='color-picker' title='Pick a color'>
        <Palette size={16} />
        <input type='color' value={color} onChange={(e) => setColor(e.target.value)} />
      </label>
      <button type='submit' className='submit'>Add Category</button>
    </form>
  )
}