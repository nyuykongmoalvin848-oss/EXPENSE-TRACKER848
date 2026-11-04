import { Suspense, lazy } from 'react'
import StatCards from './StatCards'
import Charts from './Charts'
import RecentTransactionsList from './RecentTransactionsList'

const LazyCharts = lazy(() => import('./Charts'))

function Dashboard ({ transactions }) {
  return (
    <section className='dashboard'>
      <StatCards transactions={transactions} />
      <Suspense fallback={<p>Loading charts...</p>}>
        <LazyCharts transactions={transactions} />
      </Suspense>
      <div className='chart-card'>
        <h3 className='chart-title'>Recent Transactions</h3>
        <RecentTransactionsList transactions={transactions} />
      </div>
    </section>
  )
}

export default Dashboard
