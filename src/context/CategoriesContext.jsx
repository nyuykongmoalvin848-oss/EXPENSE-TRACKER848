import { createContext, useContext } from 'react'
import { useLocalStorage } from '../hooks/useLocalStorage'

export const CategoriesContext = createContext()
export default CategoriesContext

const DEFAULT_CATEGORIES = [
  { id: 'food', name: 'Food', color: '#4caf50' },
  { id: 'transport', name: 'Transport', color: '#2196f3' },
  { id: 'housing', name: 'Housing', color: '#ff9800' },
  { id: 'entertainment', name: 'Entertainment', color: '#9c27b0' },
  { id: 'other', name: 'Other', color: '#607d8b' }
]

export function CategoriesProvider ({ children }) {
  const [categories, setCategories] = useLocalStorage('categories', DEFAULT_CATEGORIES)

  return (
    <CategoriesContext.Provider value={{ categories, setCategories }}>
      {children}
    </CategoriesContext.Provider>
  )
}

export function useCategories () {
  return useContext(CategoriesContext)
}
