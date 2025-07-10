import React from 'react'
import 'tailwindcss'

const Navbar = () => {
  return (
    <nav className='text-amber-50 bg-gray-900 border-gray-900 flex justify-between'>
        <span className='px-7 py-3 font-extrabold cursor-pointer'>MYTasks</span>
        <ul className='flex gap-8 space-x-5 px-7 py-3 '>
            <li className='cursor-pointer hover:font-bold transition-all duration-50'>Home</li>
            <li className='cursor-pointer hover:font-bold transition-all duration-50'>Tasks</li>
        </ul>
    </nav>
  )
}

export default Navbar
