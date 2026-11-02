import { useMemo } from 'react'
import { ResponsiveContainer, PieChart, Pie, Cell, Tooltip, Legend } from 'recharts'
import { useCategories } from '../../context/CategoriesContext'
import { getCategoryColor } from '../../constants'

function sanitizeChartData (rawData) {
  return rawData.map(item => ({
    ...item,
    value: typeof item.value === 'number' && !isNaN(item.value) ? item.value : 0,
    label: item.label ? String(item.label).substring(0, 12) : 'N/A'
  }))
}

function Charts ({ transactions }) {
  const { categories } = useCategories()

  const incomeVsExpense = useMemo(() => {
    const income = transactions
      .filter(t => t.type === 'income')
      .reduce((sum, t) => sum + Number(t.amount), 0)
    const expense = transactions
      .filter(t => t.type === 'expense')
      .reduce((sum, t) => sum + Number(t.amount), 0)
    return [
      { name: 'Income', value: income },
      { name: 'Expenses', value: expense }
    ]
  }, [transactions])

  const spendingByCategory = useMemo(() => {
    const map = {}
    transactions
      .filter(t => t.type === 'expense')
      .forEach(t => {
        const key = t.category || 'uncategorised'
        if (!map[key]) {
          const cat = categories.find(c => c.id === t.category)
          map[key] = {
            name: cat?.name || key || 'Uncategorised',
            value: 0,
            color: getCategoryColor(categories, t.category)
          }
        }
        map[key].value += Number(t.amount)
      })
    return Object.values(map)
  }, [transactions, categories])

  return (
    <div className='charts'>
      <div className='chart-card'>
        <h3 className='chart-title'>Income vs Expenses</h3>
        <ResponsiveContainer width='100%' height={250}>
          <PieChart>
            <Pie data={sanitizeChartData(incomeVsExpense)} cx='50%' cy='50%' outerRadius={80} dataKey='value' label>
              {incomeVsExpense.map((_, i) => (
                <Cell key={i} />
              ))}
            </Pie>
            <Tooltip />
            <Legend />
          </PieChart>
        </ResponsiveContainer>
      </div>

      <div className='chart-card'>
        <h3 className='chart-title'>Spending by Category</h3>
        {spendingByCategory.length === 0
          ? (
            <p className='empty-state'>No expenses yet.</p>
            )
          : (
            <ResponsiveContainer width='100%' height={250}>
              <PieChart>
                <Pie data={sanitizeChartData(spendingByCategory)} cx='50%' cy='50%' outerRadius={80} dataKey='value' label>
                  {spendingByCategory.map((entry, i) => (
                    <Cell key={`cat-${i}`} fill={entry.color} />
                  ))}
                </Pie>
                <Tooltip />
                <Legend />
              </PieChart>
            </ResponsiveContainer>
            )}
      </div>
    </div>
  )
}

export default Charts
