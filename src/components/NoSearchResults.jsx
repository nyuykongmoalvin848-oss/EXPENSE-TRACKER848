import { SearchX } from 'lucide-react'

export default function NoSearchResults () {
  return (
    <div className='empty-state'>
      <SearchX size={40} />
      <p>No transactions match your filters.</p>
    </div>
  )
}