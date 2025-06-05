import React from 'react'

const Navbar = () => {
  return (
    <nav className='flex  justify-between bg-cyan-700 text-white'>
        <div className='logo p-3 mx-3 cursor-pointer'>
            <span>MyTodo</span>
        </div>
        <ul className='flex gap-8 p-3 mx-3 items-center cursor-pointer'>
        <li className='font-semibold hover:scale-115'>Home</li>
        <li className='font-semibold  hover:scale-115 '>Tasks</li>
        </ul>
    </nav>
  )
}

export default Navbar
