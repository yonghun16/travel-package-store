import { Link } from 'react-router-dom'
import { useState } from 'react'
import NavItem from './Sections/NavItem'
import { FaPlaneDeparture } from "react-icons/fa";
import { FiMenu, FiX } from "react-icons/fi";

const Navbar = () => {
  const [menu, setMenu] = useState(false);
  const handleMenu = () => setMenu(!menu);
  const closeMenu = () => setMenu(false);

  return (
    <header className='relative z-20 bg-white shadow-md'>
      <div className='container mx-auto px-4 sm:px-6 lg:px-8'>
        <div className='flex items-center justify-between h-16'>
          {/* Logo */}
          <div className='flex items-center'>
            <Link to="/" onClick={closeMenu} className="flex items-center gap-2 text-2xl font-bold text-gray-800">
              <FaPlaneDeparture className="text-blue-500" />
              <span>Travel Package Store</span>
            </Link>
          </div>

          {/* Desktop Nav */}
          <nav className='hidden md:flex'>
            <NavItem />
          </nav>

          {/* Mobile Menu Button */}
          <div className='flex items-center md:hidden'>
            <button onClick={handleMenu} className="text-2xl text-gray-600">
              {menu ? <FiX /> : <FiMenu />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      {menu && (
        <div className="fixed inset-0 bg-white z-30 md:hidden">
          <div className="flex justify-end p-4">
            <button onClick={handleMenu} className="text-3xl text-gray-600">
              <FiX />
            </button>
          </div>
          <nav className="flex flex-col items-center justify-center h-full -mt-16">
            <NavItem mobile closeMenu={closeMenu} />
          </nav>
        </div>
      )}
    </header>
  );
}

export default Navbar
