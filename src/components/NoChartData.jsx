import { ChartNoAxesColumn } from 'lucide-react'

export default function NoChartData () {
  return (
    <div className='empty-state'>
      <ChartNoAxesColumn size={40} />
      <p>No chart data available.</p>
    </div>
  )
}