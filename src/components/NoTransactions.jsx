import { Wallet } from 'lucide-react'

export default function NoTransactions () {
  return (
    <div className='empty-state'>
      <Wallet size={40} />
      <p>No transactions yet. Add one above to get started.</p>
    </div>
  )
}