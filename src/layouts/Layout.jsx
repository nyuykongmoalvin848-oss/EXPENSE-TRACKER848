import { NavLink, Outlet } from 'react-router-dom'
import { useTheme } from '../context/ThemeContext'
import { Sun, Moon } from 'lucide-react'

export default function Layout () {
  const { theme, toggleTheme } = useTheme()

  return (
    <div className='wrap'>
      <header className='header'>
        <h1 className='title'>Expense Tracker</h1>
        <button className='theme-btn' onClick={toggleTheme} aria-label='Toggle theme'>
          {theme === 'light' ? <Moon size={18} /> : <Sun size={18} />}
        </button>
      </header>

      <nav className='nav'>
        <NavLink to='/' end className={({ isActive }) => 'nav-link' + (isActive ? ' active' : '')}>
          Dashboard
        </NavLink>
        <NavLink to='/transactions' className={({ isActive }) => 'nav-link' + (isActive ? ' active' : '')}>
          Transactions
        </NavLink>
        <NavLink to='/budget' className={({ isActive }) => 'nav-link' + (isActive ? ' active' : '')}>
          Budget
        </NavLink>
      </nav>

      <main className='content'>
        <Outlet />
      </main>
    </div>
  )
}
