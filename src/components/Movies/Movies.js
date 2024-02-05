import { Outlet } from 'react-router-dom'
import { SearchForm } from '../SearchForm/SearchForm'
import './Movies.css'

export function Movies(){
  return (
    <main className="movie">
      <Outlet />
    </main>
  )
}