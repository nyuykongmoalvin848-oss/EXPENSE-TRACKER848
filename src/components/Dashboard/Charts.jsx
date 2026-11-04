import { useMemo } from 'react'
import { ResponsiveContainer, PieChart, Pie, Cell, Tooltip, Legend, BarChart, Bar, XAxis, YAxis, CartesianGrid, LineChart, Line } from 'recharts'
import { useCategories } from '../../context/CategoriesContext'
import { getCategoryColor } from '../../constants'
import NoChartData from '../NoChartData'

function sanitizeChartData (rawData) {
  return rawData.map(item => ({
    ...item,
    value: typeof item.value === 'number' && !isNaN(item.value) ? item.value : 0,
    label: item.label ? String(item.label).substring(0, 12) : 'N/A'
  }))
}

function Charts ({ transactions }) {
  const { categories } = useCategories()

  const expensesOverTime = useMemo(() => {
    const map = {}
    transactions
      .filter(t => t.type === 'expense')
      .forEach(t => {
        const day = t.date
        if (!map[day]) map[day] = { date: day, amount: 0 }
        map[day].amount += Number(t.amount)
      })
    return Object.values(map).sort((a, b) => a.date.localeCompare(b.date))
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
        <h3 className='chart-title'>Expenses Over Time</h3>
        {expensesOverTime.length === 0
          ? <NoChartData />
          : (
            <ResponsiveContainer width='100%' height={250}>
              <BarChart data={expensesOverTime}>
                <CartesianGrid strokeDasharray='3 3' />
                <XAxis dataKey='date' />
                <YAxis />
                <Tooltip />
                <Legend />
                <Bar dataKey='amount' fill='#ef4444' name='Expenses' />
              </BarChart>
            </ResponsiveContainer>
            )}
      </div>

      <div className='chart-card'>
        <h3 className='chart-title'>Spending by Category</h3>
        {spendingByCategory.length === 0
          ? (
            <NoChartData />
            )
          : (
            <ResponsiveContainer width='100%' height={250}>
              <PieChart>
                <Pie data={sanitizeChartData(spendingByCategory)} cx='50%' cy='50%' outerRadius={80} dataKey='value' label nameKey='name'>
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